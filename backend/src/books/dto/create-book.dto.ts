import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;
  
 
  @IsString()
  description: string;

  @IsDate()
  releaseYear: Date;

  @IsInt()
  recomendateAge: number;

  @IsString()
  content: string;

  @IsString()
  category: string;
}
