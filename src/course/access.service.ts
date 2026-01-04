// src/course/access.service.ts
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CourseVisibility } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { JwtUser } from '../common/auth/jwt-user.type';

@Injectable()
export class AccessService {
  constructor(private prisma: PrismaService) {}

  async assertCanViewCourse(courseId: number, user?: JwtUser) {
    const course = await this.prisma.course.findFirst({
      where: { id: courseId, deletedAt: null },
      select: { id: true, visibility: true, organizationUuid: true, status: true },
    });
    if (!course || course.status !== 'PUBLISHED') throw new ForbiddenException('Course not available');

    if (course.visibility === CourseVisibility.PUBLIC) return;

    if (!user) throw new ForbiddenException('Login required');

    if (course.visibility === CourseVisibility.ORG_ONLY) {
      if (!user.tenantId || user.tenantId !== course.organizationUuid) {
        throw new ForbiddenException('Not allowed for this organization');
      }
      return;
    }

    if (course.visibility === CourseVisibility.PRIVATE_USERS) {
      const found = await this.prisma.courseAllowedUser.findFirst({
        where: { courseId: course.id, userUuid: user.sub },
        select: { id: true },
      });
      if (!found) throw new ForbiddenException('Not allowed');
      return;
    }
  }

  async assertEnrolled(courseId: number, user: JwtUser) {
    const enr = await this.prisma.enrollment.findUnique({
      where: { courseId_userUuid: { courseId, userUuid: user.sub } },
      select: { id: true, status: true, progressPercent: true },
    });
    if (!enr) throw new ForbiddenException('Not enrolled');
    return enr;
  }
}
