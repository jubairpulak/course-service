// src/course/me/dto/me.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class EnrollDto {
  @IsString()
  courseUuid!: string;
}

export class UpdateProgressDto {
  @Type(() => Number)
  @IsInt()
  lectureId!: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  lastPositionSec?: number;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}

export class SubmitQuizDto {
  @Type(() => Number)
  @IsInt()
  quizId!: number;

  // answers: { questionId: optionId }
  @IsString()
  answersJson!: string;
}

export class SubmitReviewDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
