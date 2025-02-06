import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateImageBookDto {
 
  @IsString() 
  image:string;
@IsString() 
  idBook:string;
}
