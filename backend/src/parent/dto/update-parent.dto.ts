import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateParentDto } from './create-parent.dto';
import { IsBoolean, IsOptional, IsString, Min } from 'class-validator';

export class UpdateParentDto extends PartialType(CreateParentDto) {
  @ApiProperty({ description: 'The image of the parent' })
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Flag to indicate if the image should be deleted',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  deleteImage?: boolean;
}
