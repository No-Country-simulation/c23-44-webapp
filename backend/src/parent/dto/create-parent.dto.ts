import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateParentDto {
  @ApiProperty({ description: 'The ID of the associated user' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'The image of the parent' })
  @IsString()
  image: string;

  // @ApiProperty({ description: 'The children of the parent' })
  // children: string[];
}
