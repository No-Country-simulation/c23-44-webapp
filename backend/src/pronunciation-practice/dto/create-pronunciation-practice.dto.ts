import { IsString, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePronunciationPracticeDto {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsString()
  transcript: string;

  @ApiProperty()
  @IsArray()
  mispronounced: string[];

  @ApiProperty()
  @IsNumber()
  score: number;
}
