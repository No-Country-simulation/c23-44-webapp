import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherDto {
  @ApiProperty({ description: 'Full Name of the Teacher' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ description: 'Email of the Teacher' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password of the Teacher' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Id of School administrator of the Teacher' })
  @IsString()
  @IsNotEmpty()
  adminSchoolId: string;

  @ApiProperty({ description: 'Country of the Teacher' })
  @IsString()
  @IsNotEmpty()
  country: string;
}
