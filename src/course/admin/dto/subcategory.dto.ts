// src/course/admin/dto/subcategory.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSubCategoryDto {
  @ApiProperty({
    example: 1,
    description: 'Parent category ID',
  })
  @Type(() => Number)
  @IsInt()
  categoryId!: number;

  @ApiProperty({
    example: 'Node.js',
    description: 'Human readable subcategory name',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'nodejs',
    description: 'URL friendly unique slug (typically unique within category)',
  })
  @IsString()
  slug!: string;

  @ApiPropertyOptional({
    example: 0,
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
    description: 'Whether the subcategory is active or not',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}

export class UpdateSubCategoryDto {
  @ApiPropertyOptional({
    example: 2,
    description: 'Parent category ID (change parent category if needed)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @ApiPropertyOptional({
    example: 'Advanced Node.js',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'advanced-nodejs',
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({
    example: 3,
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
