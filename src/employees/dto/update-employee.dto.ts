import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  AddressDto,
  DocumentItemDto,
  EducationItemDto,
  ExperienceItemDto,
} from './types';

export class UpdateEmployeeDto {
  // -------- General Info --------
  @ApiPropertyOptional({ example: 'Father Name' })
  @IsOptional()
  @IsString()
  fatherName?: string;

  @ApiPropertyOptional({ example: 'Ripon Hossain' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  fullName?: string;

  @ApiPropertyOptional({ example: 'Mother Name' })
  @IsOptional()
  @IsString()
  motherName?: string;

  @ApiPropertyOptional({ example: '1997-05-01' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ enum: ['MALE', 'FEMALE', 'OTHER'] })
  @IsOptional()
  @IsEnum(['MALE', 'FEMALE', 'OTHER'])
  gender?: 'MALE' | 'FEMALE' | 'OTHER';

  // -------- Address --------
  @ApiPropertyOptional({ type: AddressDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  presentAddress?: AddressDto;

  @ApiPropertyOptional({ type: AddressDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  permanentAddress?: AddressDto;

  // -------- Education --------
  @ApiPropertyOptional({ type: [EducationItemDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationItemDto)
  education?: EducationItemDto[];

  // -------- Experience --------
  @ApiPropertyOptional({ type: [ExperienceItemDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceItemDto)
  experiences?: ExperienceItemDto[];

  // -------- Skills / Trainings --------
  @ApiPropertyOptional({ example: ['MS Word', 'Excel', 'Driving'] })
  @IsOptional()
  @IsArray()
  skills?: string[];

  @ApiPropertyOptional({ example: ['Safety Training', 'Electrical Basics'] })
  @IsOptional()
  @IsArray()
  trainings?: string[];

  // -------- Passport --------
  @ApiPropertyOptional({ example: 'BN0123456' })
  @IsOptional()
  @IsString()
  passportNumber?: string;

  @ApiPropertyOptional({ example: '2023-01-01' })
  @IsOptional()
  @IsDateString()
  passportIssueAt?: string;

  @ApiPropertyOptional({ example: '2033-01-01' })
  @IsOptional()
  @IsDateString()
  passportExpireAt?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/passport.jpg' })
  @IsOptional()
  @IsString()
  passportFileUrl?: string;

  // -------- Photos / Docs --------
  @ApiPropertyOptional({ example: 'https://cdn.example.com/profile.jpg' })
  @IsOptional()
  @IsString()
  profilePhotoUrl?: string;

  @ApiPropertyOptional({ type: [DocumentItemDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentItemDto)
  otherDocs?: DocumentItemDto[];

  // -------- Meta --------
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  isCompleted?: boolean;
}
