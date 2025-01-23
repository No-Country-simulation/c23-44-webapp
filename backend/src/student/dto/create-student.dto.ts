import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  curso: string;

  @IsString()
  nivel: string;

  @IsBoolean()
  organization: boolean;
}
