// src/course/me/dto/me.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Max, Min, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class EnrollDto {
  @ApiProperty({
    example: 'c7f4f0dd-3a7c-4b58-9b4d-7a3fb4d2a9e1',
    description: 'Course UUID to enroll',
    format: 'uuid',
  })
  @IsString()
  courseUuid!: string;
}

export class UpdateProgressDto {
  @ApiProperty({
    example: 101,
    description: 'Lecture ID',
    type: Number,
    format: 'int32',
  })
  @Type(() => Number)
  @IsInt()
  lectureId!: number;

  @ApiPropertyOptional({
    example: 320,
    description: 'Last watched position in seconds (>= 0)',
    type: Number,
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  lastPositionSec?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Mark lecture as completed',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}

export class SubmitQuizDto {
  @ApiProperty({
    example: 55,
    description: 'Quiz ID',
    type: Number,
    format: 'int32',
  })
  @Type(() => Number)
  @IsInt()
  quizId!: number;

  @ApiProperty({
    example: '{"1001":2002,"1002":2007}',
    description: 'JSON string map of answers: { "questionId": "optionId" } (both numeric as strings)',
  })
  @IsString()
  // optional basic JSON-ish guard (very lightweight)
  @Matches(/^\{.*\}$/, { message: 'answersJson must be a JSON object string' })
  answersJson!: string;
}

export class SubmitReviewDto {
  @ApiProperty({
    example: 5,
    description: 'Rating between 1 to 5',
    minimum: 1,
    maximum: 5,
    type: Number,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @ApiPropertyOptional({
    example: 'Loved the pacing and examples. Prisma section was 🔥',
    description: 'Optional review comment',
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
