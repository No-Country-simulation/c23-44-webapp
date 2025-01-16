import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateSchoolDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  description: string;

  @IsString()
  country: string;

  @IsBoolean()
  isActive: boolean;
}
