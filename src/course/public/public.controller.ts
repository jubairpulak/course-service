// src/course/public/public.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseService } from '../course.service';
import { PublicCourseListQueryDto } from './dto/public-course-list.query.dto';

@ApiTags('Public Courses')
@Controller('public/courses')
export class PublicController {
  constructor(private readonly courses: CourseService) {}

  @Get()
  list(@Query() q: PublicCourseListQueryDto) {
    return this.courses.publicList(q);
  }

  @Get(':slug')
  detail(@Param('slug') slug: string) {
    return this.courses.publicDetailBySlug(slug);
  }
}
