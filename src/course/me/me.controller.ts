// src/course/me/me.controller.ts
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ReqUser } from '../../common/decorators/req-user.decorator';
import { JwtUser } from '../../common/auth/jwt-user.type';
import { CourseService } from '../course.service';
import { EnrollDto, SubmitQuizDto, SubmitReviewDto, UpdateProgressDto } from './dto/me.dto';

@ApiTags('Me (User)')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('me/courses')
export class MeController {
  constructor(private readonly courses: CourseService) {}

  @Post('enroll')
  enroll(@ReqUser() user: JwtUser, @Body() dto: EnrollDto) {
    return this.courses.enroll(user, dto.courseUuid);
  }

  @Get()
  myCourses(
    @ReqUser() user: JwtUser,
    @Query('status') status?: 'NOT_STARTED' | 'ACTIVE' | 'COMPLETED',
  ) {
    return this.courses.myCourses(user, status);
  }

  @Get(':courseUuid/curriculum')
  curriculum(@ReqUser() user: JwtUser, @Param('courseUuid') courseUuid: string) {
    return this.courses.curriculumForUser(user, courseUuid);
  }

  @Get(':courseUuid/lectures/:lectureId')
  lecture(
    @ReqUser() user: JwtUser,
    @Param('courseUuid') courseUuid: string,
    @Param('lectureId') lectureId: string,
  ) {
    return this.courses.getLectureForUser(user, courseUuid, Number(lectureId));
  }

  @Patch(':courseUuid/progress')
  updateProgress(@ReqUser() user: JwtUser, @Param('courseUuid') courseUuid: string, @Body() dto: UpdateProgressDto) {
    return this.courses.updateProgress(user, courseUuid, dto);
  }

  @Post(':courseUuid/quizzes/submit')
  submitQuiz(@ReqUser() user: JwtUser, @Param('courseUuid') courseUuid: string, @Body() dto: SubmitQuizDto) {
    return this.courses.submitQuiz(user, courseUuid, dto);
  }

  @Post(':courseUuid/review')
  review(@ReqUser() user: JwtUser, @Param('courseUuid') courseUuid: string, @Body() dto: SubmitReviewDto) {
    return this.courses.submitReview(user, courseUuid, dto);
  }

  @Get(':courseUuid/certificate')
  certificate(@ReqUser() user: JwtUser, @Param('courseUuid') courseUuid: string) {
    return this.courses.getCertificate(user, courseUuid);
  }
}
