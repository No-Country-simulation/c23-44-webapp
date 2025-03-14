import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolDto {
  @ApiProperty({ description: 'Name of the school' })
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Email of the school' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password of the school' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Country of the school' })
  @IsString()
  country: string;

  @ApiProperty({ description: 'Status of the school' })
  @IsBoolean()
  isActive: boolean;
}
