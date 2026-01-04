// src/course/admin/dto/course.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
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
  @ApiProperty() @IsString() uuid!: string; // generate from API gateway or client
  @ApiProperty() @IsString() title!: string;
  @ApiProperty() @IsString() slug!: string;

  @ApiPropertyOptional() @IsOptional() @IsString() shortDescription?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() language?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() level?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() thumbnailUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() bannerUrl?: string;

  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() @Min(0) price?: number = 0;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() @Min(0) offerPrice?: number;

  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsInt() categoryId?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsInt() subCategoryId?: number;

  @ApiPropertyOptional({ enum: CourseVisibilityDto })
  @IsOptional()
  @IsEnum(CourseVisibilityDto)
  visibility?: CourseVisibilityDto = CourseVisibilityDto.PUBLIC;

  @ApiPropertyOptional({ description: 'Required if ORG_ONLY' })
  @IsOptional()
  @IsString()
  organizationUuid?: string;

  @ApiPropertyOptional({ enum: CourseStatusDto })
  @IsOptional()
  @IsEnum(CourseStatusDto)
  status?: CourseStatusDto = CourseStatusDto.DRAFT;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean = false;
}

export class UpdateCourseDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() slug?: string;
  @IsOptional() @IsString() shortDescription?: string;
  @IsOptional() @IsString() description?: string;

  @IsOptional() @IsString() language?: string;
  @IsOptional() @IsString() level?: string;

  @IsOptional() @IsString() thumbnailUrl?: string;
  @IsOptional() @IsString() bannerUrl?: string;

  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) price?: number;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) offerPrice?: number;

  @IsOptional() @Type(() => Number) @IsInt() categoryId?: number;
  @IsOptional() @Type(() => Number) @IsInt() subCategoryId?: number;

  @IsOptional() @IsEnum(CourseVisibilityDto) visibility?: CourseVisibilityDto;
  @IsOptional() @IsString() organizationUuid?: string;

  @IsOptional() @IsEnum(CourseStatusDto) status?: CourseStatusDto;
  @IsOptional() @IsBoolean() isFeatured?: boolean;
}

export class SetAllowedUsersDto {
  @ApiProperty({ description: 'List of user UUIDs allowed for PRIVATE_USERS' })
  @IsString()
  userUuidsCsv!: string; // "uuid1,uuid2"
}
