import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateParentDto {
  @ApiProperty({ description: 'The ID of the associated user' })
  @IsString()
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'The image of the parent' })
  @IsOptional()
  @IsString()
  image?: string;

  // @ApiProperty({ description: 'The children of the parent' })
  // children: string[];
}
