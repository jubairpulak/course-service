import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class AddressDto {
  @ApiPropertyOptional({ example: 'Dhaka' })
  @IsOptional()
  @IsString()
  division?: string;

  @ApiPropertyOptional({ example: 'Gazipur' })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({ example: 'Sreepur' })
  @IsOptional()
  @IsString()
  upazila?: string;

  @ApiPropertyOptional({ example: 'Union Name' })
  @IsOptional()
  @IsString()
  union?: string;

  @ApiPropertyOptional({ example: 'Village / Area' })
  @IsOptional()
  @IsString()
  village?: string;
}

export class EducationItemDto {
  @ApiProperty({ example: 'SSC', description: 'SSC/HSC/Bachelor/Masters' })
  @IsString()
  level: string;

  @ApiPropertyOptional({ example: 'Science' })
  @IsOptional()
  @IsString()
  group?: string;

  @ApiPropertyOptional({ example: 'ABC School/College/University' })
  @IsOptional()
  @IsString()
  institute?: string;

  @ApiPropertyOptional({ example: 2018 })
  @IsOptional()
  @IsInt()
  @Min(1900)
  passingYear?: number;

  @ApiPropertyOptional({ example: '4.75' })
  @IsOptional()
  @IsString()
  result?: string;
}

export class ExperienceItemDto {
  @ApiProperty({ example: 'Electrician' })
  @IsString()
  jobTitle: string;

  @ApiPropertyOptional({ example: 'ABC Company' })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsInt()
  @Min(0)
  totalYears?: number;

  @ApiPropertyOptional({ example: 'Work details...' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class DocumentItemDto {
  @ApiProperty({ example: 'NID' })
  @IsString()
  type: string;

  @ApiPropertyOptional({ example: 'nid-front.jpg' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'https://cdn.example.com/docs/nid-front.jpg' })
  @IsUrl()
  url: string;
}
