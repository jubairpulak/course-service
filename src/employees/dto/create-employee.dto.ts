import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' })
  @IsUUID()
  authUserId: string; // from auth-service

  @ApiPropertyOptional({ example: 'Ripon Hossain' })
  @IsString()
  @MinLength(2)
  fullName?: string;

  @ApiProperty({ example: '+88017XXXXXXXX' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'ripon@gmail.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ enum: ['MALE', 'FEMALE', 'OTHER'] })
  @IsOptional()
  @IsEnum(['MALE', 'FEMALE', 'OTHER'])
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
}
