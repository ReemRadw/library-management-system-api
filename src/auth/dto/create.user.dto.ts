/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUser {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { message: 'email not valid' })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @ApiProperty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message:
      'password must have atleast 8 chars which should be between uppercase characters, lowercase characters, special characters, and numbers',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;
}

export class SignIn {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
