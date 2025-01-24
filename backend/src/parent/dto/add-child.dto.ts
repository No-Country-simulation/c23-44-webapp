import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddChildDto {
  @ApiProperty({ description: 'The ID of the student to be added as a child' })
  @IsNumber()
  studentId: string;
}
