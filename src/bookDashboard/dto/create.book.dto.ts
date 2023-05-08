/* eslint-disable prettier/prettier */
import { ApiMethodNotAllowedResponse, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { basename } from 'path';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  bookName: string;

  @ApiProperty()
  @IsNotEmpty()
  Description: string;

  @ApiProperty()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty()
  @IsNotEmpty()
  authorId: string;

  @ApiProperty()
  @IsNotEmpty()
  Field: string;

  @ApiProperty()
  @IsNotEmpty()
  publicationDate: string;

  @ApiProperty()
  @IsNotEmpty()
  PDF: string;
}
