// src/course/admin/dto/course.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString, Min, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export enum CourseVisibilityDto {
  PUBLIC = 'PUBLIC',
  ORG_ONLY = 'ORG_ONLY',
  PRIVATE_USERS = 'PRIVATE_USERS',
}
export enum CourseStatusDto {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export class CreateCourseDto {
  @ApiProperty({
    example: 'c7f4f0dd-3a7c-4b58-9b4d-7a3fb4d2a9e1',
    description: 'Client/API Gateway generated UUID for the course',
    format: 'uuid',
  })
  @IsString()
  uuid!: string;

  @ApiProperty({
    example: 'NestJS Masterclass',
    description: 'Course title',
  })
  @IsString()
  title!: string;

  @ApiProperty({
    example: 'nestjs-masterclass',
    description: 'URL friendly unique slug',
    pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
  })
  @IsString()
  slug!: string;

  @ApiPropertyOptional({
    example: 'Build production-grade NestJS services with Prisma & RabbitMQ',
  })
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @ApiPropertyOptional({
    example: 'This course covers modules, DI, auth, prisma schema design, and microservices...',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'en',
    description: 'ISO language code (e.g. en, bn)',
  })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({
    example: 'Beginner',
    description: 'Any level label your UI uses (Beginner/Intermediate/Advanced)',
  })
  @IsOptional()
  @IsString()
  level?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.example.com/courses/nestjs/thumb.png',
    description: 'Publicly accessible thumbnail URL',
  })
  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.example.com/courses/nestjs/banner.png',
    description: 'Publicly accessible banner URL',
  })
  @IsOptional()
  @IsString()
  bannerUrl?: string;

  @ApiPropertyOptional({
    example: 2000,
    description: 'Base price (>= 0)',
    default: 0,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price?: number = 0;

  @ApiPropertyOptional({
    example: 1499,
    description: 'Discounted price (>= 0) and usually <= price',
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offerPrice?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Category ID',
    type: Number,
    format: 'int32',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'SubCategory ID',
    type: Number,
    format: 'int32',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  subCategoryId?: number;

  @ApiPropertyOptional({
    enum: CourseVisibilityDto,
    example: CourseVisibilityDto.PUBLIC,
    description: 'Visibility scope of the course',
    default: CourseVisibilityDto.PUBLIC,
  })
  @IsOptional()
  @IsEnum(CourseVisibilityDto)
  visibility?: CourseVisibilityDto = CourseVisibilityDto.PUBLIC;

  @ApiPropertyOptional({
    example: 'org_0f6a2c0b-8a42-4f79-8b07-6d1d2e3c4a5b',
    description: 'Required when visibility = ORG_ONLY',
  })
  @IsOptional()
  @IsString()
  organizationUuid?: string;

  @ApiPropertyOptional({
    enum: CourseStatusDto,
    example: CourseStatusDto.DRAFT,
    description: 'Publishing status of the course',
    default: CourseStatusDto.DRAFT,
  })
  @IsOptional()
  @IsEnum(CourseStatusDto)
  status?: CourseStatusDto = CourseStatusDto.DRAFT;

  @ApiPropertyOptional({
    example: false,
    description: 'Promote course on homepage/featured sections',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean = false;
}

export class UpdateCourseDto {
  @ApiPropertyOptional({ example: 'NestJS Masterclass (2026 Edition)' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    example: 'nestjs-masterclass-2026',
    pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ example: 'Updated content for 2026' })
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @ApiPropertyOptional({ example: 'Full updated description...' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'bn' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({ example: 'Intermediate' })
  @IsOptional()
  @IsString()
  level?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/courses/nestjs/thumb-v2.png' })
  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/courses/nestjs/banner-v2.png' })
  @IsOptional()
  @IsString()
  bannerUrl?: string;

  @ApiPropertyOptional({ example: 2500, type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({ example: 1999, type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offerPrice?: number;

  @ApiPropertyOptional({ example: 2, type: Number, format: 'int32' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @ApiPropertyOptional({ example: 12, type: Number, format: 'int32' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  subCategoryId?: number;

  @ApiPropertyOptional({ enum: CourseVisibilityDto, example: CourseVisibilityDto.ORG_ONLY })
  @IsOptional()
  @IsEnum(CourseVisibilityDto)
  visibility?: CourseVisibilityDto;

  @ApiPropertyOptional({
    example: 'org_0f6a2c0b-8a42-4f79-8b07-6d1d2e3c4a5b',
    description: 'Needed when visibility = ORG_ONLY',
  })
  @IsOptional()
  @IsString()
  organizationUuid?: string;

  @ApiPropertyOptional({ enum: CourseStatusDto, example: CourseStatusDto.PUBLISHED })
  @IsOptional()
  @IsEnum(CourseStatusDto)
  status?: CourseStatusDto;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}

export class SetAllowedUsersDto {
  @ApiProperty({
    example: 'user_2a1c...,user_91bd...,user_f0aa...',
    description: 'Comma-separated list of user UUIDs allowed when visibility = PRIVATE_USERS',
  })
  @IsString()
  // optional: basic CSV check (keeps Swagger & validation aligned)
  @Matches(/^[^,\s]+(,[^,\s]+)*$/, { message: 'userUuidsCsv must be comma-separated values without spaces' })
  userUuidsCsv!: string;
}
