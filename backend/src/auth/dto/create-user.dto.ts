import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The full name of the user' })
  @IsString()
  @MinLength(1)
  fullName: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  @MinLength(4)
  @MaxLength(9)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({ description: 'The country of the user' })
  @IsString()
  @MinLength(1)
  country: string;
}
