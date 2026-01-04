// src/course/admin/dto/category.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Web Development',
    description: 'Human readable category name',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'web-development',
    description: 'URL friendly unique slug',
  })
  @IsString()
  slug!: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Sorting order (0 = highest priority)',
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  sortOrder?: number = 0;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether the category is active or not',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    example: 'Backend Development',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'backend-development',
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({
    example: 2,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional({
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
