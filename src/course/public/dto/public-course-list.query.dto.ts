// src/course/public/dto/public-course-list.query.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CursorPaginationDto } from '../../../common/pagination/cursor-pagination.dto';

export enum CourseSort {
  RELEVANCE = 'RELEVANCE',
  NEWEST = 'NEWEST',
  PRICE_LOW = 'PRICE_LOW',
  PRICE_HIGH = 'PRICE_HIGH',
  TOP_RATED = 'TOP_RATED',
  POPULAR = 'POPULAR',
}

export class PublicCourseListQueryDto extends CursorPaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  subCategoryId?: number;

  @ApiPropertyOptional({ description: 'Optional for org-specific catalog filtering' })
  @IsOptional()
  @IsString()
  organizationUuid?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ enum: CourseSort, default: CourseSort.NEWEST })
  @IsOptional()
  @IsEnum(CourseSort)
  sort?: CourseSort = CourseSort.NEWEST;
}
