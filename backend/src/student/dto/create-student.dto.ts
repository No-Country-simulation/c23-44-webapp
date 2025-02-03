import { IsBoolean, IsString } from 'class-validator';
import { ValidRoles } from 'src/auth/interfaces';

export class CreateStudentDto {
  @IsString()
  fullName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: ValidRoles.STUDENT;

  @IsString()
  country: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  image:string;
}
