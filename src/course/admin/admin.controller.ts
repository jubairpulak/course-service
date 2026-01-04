// src/course/admin/admin.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../common/auth/roles.decorator';
import { CourseService } from '../course.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { CreateSubCategoryDto, UpdateSubCategoryDto } from './dto/subcategory.dto';
import { CreateCourseDto, SetAllowedUsersDto, UpdateCourseDto } from './dto/course.dto';

@ApiTags('Admin')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Roles('ADMIN') // change to your actual admin role string
@Controller('admin')
export class AdminController {
  constructor(private readonly courses: CourseService) {}

  // Category CRUD
  @Post('categories') createCategory(@Body() dto: CreateCategoryDto) { return this.courses.createCategory(dto); }
  @Get('categories') listCategories() { return this.courses.listCategories(); }
  @Patch('categories/:id') updateCategory(@Param('id') id: string, @Body() dto: UpdateCategoryDto) { return this.courses.updateCategory(Number(id), dto); }
  @Delete('categories/:id') deleteCategory(@Param('id') id: string) { return this.courses.deleteCategory(Number(id)); }

  // SubCategory CRUD
  @Post('subcategories') createSub(@Body() dto: CreateSubCategoryDto) { return this.courses.createSubCategory(dto); }
  @Get('subcategories') listSub() { return this.courses.listSubCategories(); }
  @Patch('subcategories/:id') updateSub(@Param('id') id: string, @Body() dto: UpdateSubCategoryDto) { return this.courses.updateSubCategory(Number(id), dto); }
  @Delete('subcategories/:id') deleteSub(@Param('id') id: string) { return this.courses.deleteSubCategory(Number(id)); }

  // Course CRUD
  @Post('courses') createCourse(@Body() dto: CreateCourseDto) { return this.courses.createCourse(dto); }
  @Get('courses') listCourses() { return this.courses.adminListCourses(); }
  @Get('courses/:id') getCourse(@Param('id') id: string) { return this.courses.adminGetCourse(Number(id)); }
  @Patch('courses/:id') updateCourse(@Param('id') id: string, @Body() dto: UpdateCourseDto) { return this.courses.updateCourse(Number(id), dto); }
  @Delete('courses/:id') softDeleteCourse(@Param('id') id: string) { return this.courses.softDeleteCourse(Number(id)); }

  // Allowed users for PRIVATE_USERS
  @Post('courses/:id/allowed-users')
  setAllowedUsers(@Param('id') id: string, @Body() dto: SetAllowedUsersDto) {
    return this.courses.setAllowedUsers(Number(id), dto.userUuidsCsv);
  }
}
