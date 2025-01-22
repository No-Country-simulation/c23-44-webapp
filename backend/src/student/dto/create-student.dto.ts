import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsBoolean()
  organization: boolean;
}
