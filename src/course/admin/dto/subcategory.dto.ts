// src/course/admin/dto/subcategory.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSubCategoryDto {
  @ApiProperty() @Type(() => Number) @IsInt() categoryId!: number;
  @ApiProperty() @IsString() name!: string;
  @ApiProperty() @IsString() slug!: string;

  @IsOptional() @Type(() => Number) @IsInt() @Min(0) sortOrder?: number = 0;
  @IsOptional() @IsBoolean() isActive?: boolean = true;
}

export class UpdateSubCategoryDto {
  @IsOptional() @Type(() => Number) @IsInt() categoryId?: number;
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() slug?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) sortOrder?: number;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
