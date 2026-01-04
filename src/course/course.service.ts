// src/course/course.service.ts
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, CourseStatus, CourseVisibility, EnrollmentStatus } from '@prisma/client';
import { PublicCourseListQueryDto, CourseSort } from './public/dto/public-course-list.query.dto';
import { AccessService } from './access.service';
import { JwtUser } from '../common/auth/jwt-user.type';
import { CreateCategoryDto, UpdateCategoryDto } from './admin/dto/category.dto';
import { CreateSubCategoryDto, UpdateSubCategoryDto } from './admin/dto/subcategory.dto';
import { CreateCourseDto, UpdateCourseDto } from './admin/dto/course.dto';
import { UpdateProgressDto, SubmitQuizDto, SubmitReviewDto } from './me/dto/me.dto';

@Injectable()
export class CourseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly access: AccessService,
  ) {}

  // ---------------------------
  // PUBLIC: LIST (search/sort/filter)
  // ---------------------------
  async publicList(dto: PublicCourseListQueryDto) {
    const limit = dto.limit ?? 20;
    const cursorId = dto.cursor ? Number(dto.cursor) : undefined;

    // base
    const baseWhere: Prisma.CourseWhereInput = {
      status: CourseStatus.PUBLISHED,
      deletedAt: null,
      ...(dto.categoryId ? { categoryId: dto.categoryId } : {}),
      ...(dto.subCategoryId ? { subCategoryId: dto.subCategoryId } : {}),
      ...(dto.organizationUuid ? { organizationUuid: dto.organizationUuid } : {}),
      // public catalog only: do not leak private org-only unless caller filters orgUuid intentionally
      visibility: CourseVisibility.PUBLIC,
    };

    if (dto.minPrice != null || dto.maxPrice != null) {
      const min = dto.minPrice ?? 0;
      const max = dto.maxPrice ?? 99999999;
      (baseWhere as any).OR = [
        { offerPrice: { gte: min, lte: max } },
        { offerPrice: null, price: { gte: min, lte: max } },
      ];
    }

    // FULLTEXT when q present
    if (dto.q && dto.q.trim()) {
      const q = dto.q.trim();
      const cursorClause = cursorId ? Prisma.sql`AND c.id < ${cursorId}` : Prisma.empty;

      const rows = await this.prisma.$queryRaw<any[]>(
        Prisma.sql`
        SELECT
          c.id, c.uuid, c.title, c.slug, c.thumbnailUrl,
          c.price, c.offerPrice, c.currency,
          c.ratingAvg, c.ratingCount, c.enrollmentCount, c.publishedAt,
          MATCH(c.title, c.shortDescription, c.description) AGAINST (${q} IN NATURAL LANGUAGE MODE) AS relevance
        FROM Course c
        WHERE
          c.status = 'PUBLISHED'
          AND c.deletedAt IS NULL
          AND c.visibility = 'PUBLIC'
          ${cursorClause}
          ${dto.categoryId ? Prisma.sql`AND c.categoryId = ${dto.categoryId}` : Prisma.empty}
          ${dto.subCategoryId ? Prisma.sql`AND c.subCategoryId = ${dto.subCategoryId}` : Prisma.empty}
          AND MATCH(c.title, c.shortDescription, c.description) AGAINST (${q} IN NATURAL LANGUAGE MODE)
        ORDER BY relevance DESC, c.ratingAvg DESC, c.ratingCount DESC, c.id DESC
        LIMIT ${limit + 1}
      `,
      );

      const hasNext = rows.length > limit;
      const items = hasNext ? rows.slice(0, limit) : rows;
      const nextCursor = hasNext ? String(items[items.length - 1].id) : null;
      return { items, nextCursor };
    }

    const orderBy = this.mapOrder(dto.sort);
    const items = await this.prisma.course.findMany({
      where: { ...baseWhere, ...(cursorId ? { id: { lt: cursorId } } : {}) },
      select: {
        id: true, uuid: true, title: true, slug: true,
        thumbnailUrl: true, price: true, offerPrice: true, currency: true,
        ratingAvg: true, ratingCount: true, enrollmentCount: true, publishedAt: true,
      },
      orderBy,
      take: limit + 1,
    });

    const hasNext = items.length > limit;
    const sliced = hasNext ? items.slice(0, limit) : items;
    const nextCursor = hasNext ? String(sliced[sliced.length - 1].id) : null;
    return { items: sliced, nextCursor };
  }

  private mapOrder(sort?: CourseSort): Prisma.CourseOrderByWithRelationInput[] {
    switch (sort) {
      case CourseSort.PRICE_LOW:
        return [{ offerPrice: 'asc' }, { price: 'asc' }, { id: 'desc' }];
      case CourseSort.PRICE_HIGH:
        return [{ offerPrice: 'desc' }, { price: 'desc' }, { id: 'desc' }];
      case CourseSort.TOP_RATED:
        return [{ ratingAvg: 'desc' }, { ratingCount: 'desc' }, { id: 'desc' }];
      case CourseSort.POPULAR:
        return [{ enrollmentCount: 'desc' }, { id: 'desc' }];
      case CourseSort.NEWEST:
      default:
        return [{ publishedAt: 'desc' }, { id: 'desc' }];
    }
  }

  async publicDetailBySlug(slug: string) {
  const c = await this.prisma.course.findFirst({
  where: {
    slug,
    deletedAt: null,
    status: CourseStatus.PUBLISHED,
    visibility: CourseVisibility.PUBLIC,
  },
  include: {
    Category: true,
    SubCategory: true,

    CourseSection: {
      orderBy: { sortOrder: 'asc' },
      include: {
        Lecture: {
          orderBy: { sortOrder: 'asc' },
          select: { id: true, title: true, durationSec: true, isPreview: true },
        },
        Quiz: {
          orderBy: { sortOrder: 'asc' },
          select: { id: true, title: true, timeLimitSec: true },
        },
      },
    },

    CourseReview: { take: 10, orderBy: { createdAt: 'desc' } },
  },
});

    if (!c) throw new NotFoundException('Course not found');
    return c;
  }

  // ---------------------------
  // USER (ME): ENROLL & MY COURSES
  // ---------------------------
  async enroll(user: JwtUser, courseUuid: string) {
    const course = await this.prisma.course.findFirst({
      where: { uuid: courseUuid, deletedAt: null, status: CourseStatus.PUBLISHED },
      select: { id: true, visibility: true, organizationUuid: true },
    });
    if (!course) throw new NotFoundException('Course not found');

    await this.access.assertCanViewCourse(course.id, user);

    const res = await this.prisma.$transaction(async (tx) => {
      const existing = await tx.enrollment.findUnique({
        where: { courseId_userUuid: { courseId: course.id, userUuid: user.sub } },
        select: { id: true },
      });
      if (existing) return existing;

      const created = await tx.enrollment.create({
        data: { courseId: course.id, userUuid: user.sub, status: EnrollmentStatus.NOT_STARTED },
        select: { id: true },
      });

      await tx.course.update({
        where: { id: course.id },
        data: { enrollmentCount: { increment: 1 } },
      });

      return created;
    });

    return { ok: true, enrollmentId: res.id };
  }

  async myCourses(user: JwtUser, status?: 'NOT_STARTED' | 'ACTIVE' | 'COMPLETED') {
    return this.prisma.enrollment.findMany({
      where: { userUuid: user.sub, ...(status ? { status: status as any } : {}) },
      orderBy: { enrolledAt: 'desc' },
      select: {
        id: true,
        status: true,
        progressPercent: true,
        enrolledAt: true,
        completedAt: true,
        Course: {
          select: { uuid: true, title: true, slug: true, thumbnailUrl: true, price: true, offerPrice: true, currency: true },
        },
      },
    });
  }

  async curriculumForUser(user: JwtUser, courseUuid: string) {
    const course = await this.prisma.course.findFirst({
      where: { uuid: courseUuid, deletedAt: null, status: CourseStatus.PUBLISHED },
      select: { id: true },
    });
    if (!course) throw new NotFoundException('Course not found');

    await this.access.assertCanViewCourse(course.id, user);
    const enr = await this.access.assertEnrolled(course.id, user);

    const sections = await this.prisma.courseSection.findMany({
      where: { courseId: course.id },
      orderBy: { sortOrder: 'asc' },
      include: {
        Lecture: {
          orderBy: { sortOrder: 'asc' },
          select: { id: true, title: true, durationSec: true, isPreview: true },
        },
        Quiz: {
          orderBy: { sortOrder: 'asc' },
          select: { id: true, title: true, timeLimitSec: true, passMark: true },
        },
      },
    });

    return { enrollment: enr, sections };
  }

  async getLectureForUser(user: JwtUser, courseUuid: string, lectureId: number) {
    const course = await this.prisma.course.findFirst({
      where: { uuid: courseUuid, deletedAt: null, status: CourseStatus.PUBLISHED },
      select: { id: true },
    });
    if (!course) throw new NotFoundException('Course not found');

    await this.access.assertCanViewCourse(course.id, user);

    const lecture = await this.prisma.lecture.findFirst({
      where: { id: lectureId, courseId: course.id },
      select: {
        id: true, title: true, contentType: true, contentUrl: true, articleHtml: true,
        durationSec: true, isPreview: true, sectionId: true, sortOrder: true,
      },
    });
    if (!lecture) throw new NotFoundException('Lecture not found');

    // if not preview -> must be enrolled
    if (!lecture.isPreview) {
      await this.access.assertEnrolled(course.id, user);
    }

    return lecture;
  }

  async updateProgress(user: JwtUser, courseUuid: string, dto: UpdateProgressDto) {
    const course = await this.prisma.course.findFirst({
      where: { uuid: courseUuid, deletedAt: null, status: CourseStatus.PUBLISHED },
      select: { id: true },
    });
    if (!course) throw new NotFoundException('Course not found');

    const enr = await this.access.assertEnrolled(course.id, user);

    const lecture = await this.prisma.lecture.findFirst({
      where: { id: dto.lectureId, courseId: course.id },
      select: { id: true },
    });
    if (!lecture) throw new NotFoundException('Lecture not found');

    const updated = await this.prisma.$transaction(async (tx) => {
     const p = await tx.lectureProgress.upsert({
  where: {
    enrollmentId_lectureId: {
      enrollmentId: enr.id,
      lectureId: lecture.id,
    },
  },
  update: {
    lastPositionSec: dto.lastPositionSec ?? 0,
    ...(dto.isCompleted != null ? { isCompleted: dto.isCompleted } : {}),
  },
  create: {
    enrollmentId: enr.id,
    lectureId: lecture.id,
    lastPositionSec: dto.lastPositionSec ?? 0,
    isCompleted: dto.isCompleted ?? false,
  } satisfies Prisma.LectureProgressUncheckedCreateInput,
});


      // recompute progressPercent cheaply (count completed / total lectures)
      const total = await tx.lecture.count({ where: { courseId: course.id } });
      const completed = await tx.lectureProgress.count({ where: { enrollmentId: enr.id, isCompleted: true } });
      const percent = total === 0 ? 0 : Math.floor((completed / total) * 100);

      const status = percent >= 100 ? EnrollmentStatus.COMPLETED : percent > 0 ? EnrollmentStatus.ACTIVE : EnrollmentStatus.NOT_STARTED;

      await tx.enrollment.update({
        where: { id: enr.id },
        data: { progressPercent: percent, status, ...(status === EnrollmentStatus.COMPLETED ? { completedAt: new Date() } : {}) },
      });

      return { progress: p, percent, status };
    });

    return updated;
  }

  async submitQuiz(user: JwtUser, courseUuid: string, dto: SubmitQuizDto) {
    const course = await this.prisma.course.findFirst({
      where: { uuid: courseUuid, deletedAt: null, status: CourseStatus.PUBLISHED },
      select: { id: true },
    });
    if (!course) throw new NotFoundException('Course not found');

    const enr = await this.access.assertEnrolled(course.id, user);

    const quiz = await this.prisma.quiz.findFirst({
      where: { id: dto.quizId, courseId: course.id },
      include: { QuizQuestion: { include: { QuizOption: true } } },
    });
    if (!quiz) throw new NotFoundException('Quiz not found');

    let answers: Record<string, number>;
    try {
      answers = JSON.parse(dto.answersJson);
    } catch {
      throw new BadRequestException('Invalid answersJson');
    }

    // scoring
    let correct = 0;
    let wrong = 0;
    const totalQ = quiz.QuizQuestion.length;

    for (const q of quiz.QuizQuestion) {
      const picked = answers[String(q.id)];
      if (!picked) { wrong++; continue; }
      const opt = q.QuizOption.find((o) => o.id === picked);
      if (opt?.isCorrect) correct++;
      else wrong++;
    }

    const scorePercent = totalQ === 0 ? 0 : Math.floor((correct / totalQ) * 100);
    const isPassed = scorePercent >= quiz.passMark;

    const attempt = await this.prisma.quizAttempt.create({
      data: {
        enrollmentId: enr.id,
        quizId: quiz.id,
        createdAt: new Date(),
        scorePercent,
        correctCount: correct,
        wrongCount: wrong,
        isPassed,
        answersJson: dto.answersJson,
      },
    });

    return { attemptId: attempt.id, scorePercent, correct, wrong, isPassed };
  }

  async submitReview(user: JwtUser, courseUuid: string, dto: SubmitReviewDto) {
    const course = await this.prisma.course.findFirst({
      where: { uuid: courseUuid, deletedAt: null, status: CourseStatus.PUBLISHED },
      select: { id: true },
    });
    if (!course) throw new NotFoundException('Course not found');

    // allow only enrolled
    await this.access.assertEnrolled(course.id, user);

    const result = await this.prisma.$transaction(async (tx) => {
      const review = await tx.courseReview.upsert({
        where: { courseId_userUuid: { courseId: course.id, userUuid: user.sub } },
        update: { rating: dto.rating, comment: dto.comment },
        create: { courseId: course.id, userUuid: user.sub, rating: dto.rating, comment: dto.comment },
      });

      // recompute aggregates (safe)
      const agg = await tx.courseReview.aggregate({
        where: { courseId: course.id },
        _avg: { rating: true },
        _count: { rating: true },
      });

      await tx.course.update({
        where: { id: course.id },
        data: {
          ratingAvg: new Prisma.Decimal(Number(agg._avg.rating ?? 0).toFixed(2)),
          ratingCount: agg._count.rating,
        },
      });

      return review;
    });

    return { ok: true, reviewId: result.id };
  }

  async getCertificate(user: JwtUser, courseUuid: string) {
    const course = await this.prisma.course.findFirst({
      where: { uuid: courseUuid, deletedAt: null },
      select: { id: true, title: true },
    });
    if (!course) throw new NotFoundException('Course not found');

    const enr = await this.access.assertEnrolled(course.id, user);
    if (enr.status !== EnrollmentStatus.COMPLETED) throw new ForbiddenException('Course not completed');

    const cert = await this.prisma.certificate.findFirst({
      where: { enrollmentId: enr.id },
    });

    if (cert) return cert;

    // generate minimal cert
    const certificateNo = `MPX-${course.id}-${enr.id}-${Date.now()}`;

    return this.prisma.certificate.create({
      data: {
        courseId: course.id,
        enrollmentId: enr.id,
        userUuid: user.sub,
        certificateNo,
        payloadJson: JSON.stringify({ courseTitle: course.title, userUuid: user.sub }),
        qrData: certificateNo,
      },
    });
  }

  // ---------------------------
  // ADMIN CRUD
  // ---------------------------
  createCategory(dto: CreateCategoryDto) {
    return this.prisma.category.create({ data: dto });
  }
  listCategories() {
    return this.prisma.category.findMany({ orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }] });
  }
  updateCategory(id: number, dto: UpdateCategoryDto) {
    return this.prisma.category.update({ where: { id }, data: dto });
  }
  deleteCategory(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }

  createSubCategory(dto: CreateSubCategoryDto) {
    return this.prisma.subCategory.create({ data: dto });
  }
  listSubCategories() {
    return this.prisma.subCategory.findMany({ orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }], include: { Category: true } });
  }
  updateSubCategory(id: number, dto: UpdateSubCategoryDto) {
    return this.prisma.subCategory.update({ where: { id }, data: dto });
  }
  deleteSubCategory(id: number) {
    return this.prisma.subCategory.delete({ where: { id } });
  }

  async createCourse(dto: CreateCourseDto) {
    if (dto.visibility === 'ORG_ONLY' && !dto.organizationUuid) {
      throw new BadRequestException('organizationUuid required for ORG_ONLY');
    }

    const now = new Date();
    const publishedAt = dto.status === 'PUBLISHED' ? now : null;

    return this.prisma.course.create({
      data: {
        uuid: dto.uuid,
        title: dto.title,
        slug: dto.slug,
        shortDescription: dto.shortDescription,
        description: dto.description,
        language: dto.language,
        level: dto.level,
        thumbnailUrl: dto.thumbnailUrl,
        bannerUrl: dto.bannerUrl,
        price: new Prisma.Decimal(dto.price ?? 0),
        offerPrice: dto.offerPrice != null ? new Prisma.Decimal(dto.offerPrice) : null,
        categoryId: dto.categoryId,
        subCategoryId: dto.subCategoryId,
        visibility: dto.visibility as any,
        organizationUuid: dto.organizationUuid ?? null,
        status: dto.status as any,
        publishedAt,
        isFeatured: dto.isFeatured ?? false,
      },
    });
  }

  adminListCourses() {
    return this.prisma.course.findMany({
      where: { deletedAt: null },
      orderBy: { id: 'desc' },
      include: { Category: true, SubCategory: true },
    });
  }

  adminGetCourse(id: number) {
    return this.prisma.course.findFirst({
      where: { id, deletedAt: null },
      include: {
        // OutComes: { orderBy: { sortOrder: 'asc' } },
          // : { orderBy: { sortOrder: 'asc' } },
        CourseSection: {
          orderBy: { sortOrder: 'asc' },
          include: {
            Lecture: { orderBy: { sortOrder: 'asc' } },
            Quiz: { orderBy: { sortOrder: 'asc' }, include: { QuizQuestion: { include: { QuizOption: true } } } },
          },
        },
        CourseAllowedUser: true,
      },
    });
  }

  async updateCourse(id: number, dto: UpdateCourseDto) {
    if (dto.visibility === 'ORG_ONLY' && !dto.organizationUuid) {
      throw new BadRequestException('organizationUuid required for ORG_ONLY');
    }

    const existing = await this.prisma.course.findFirst({ where: { id, deletedAt: null }, select: { status: true } });
    if (!existing) throw new NotFoundException('Course not found');

    const data: any = {
      ...dto,
      ...(dto.price != null ? { price: new Prisma.Decimal(dto.price) } : {}),
      ...(dto.offerPrice != null ? { offerPrice: new Prisma.Decimal(dto.offerPrice) } : {}),
    };

    // publish timestamp when moving to published
    if (existing.status !== 'PUBLISHED' && dto.status === 'PUBLISHED') {
      data.publishedAt = new Date();
    }

    return this.prisma.course.update({ where: { id }, data });
  }

  softDeleteCourse(id: number) {
    return this.prisma.course.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async setAllowedUsers(courseId: number, csv: string) {
    const uuids = csv
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    await this.prisma.$transaction(async (tx) => {
      await tx.courseAllowedUser.deleteMany({ where: { courseId } });
      if (uuids.length > 0) {
        await tx.courseAllowedUser.createMany({
          data: uuids.map((u) => ({ courseId, userUuid: u })),
          skipDuplicates: true,
        });
      }
    });

    return { ok: true, count: uuids.length };
  }
}
