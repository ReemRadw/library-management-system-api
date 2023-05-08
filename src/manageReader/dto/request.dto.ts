/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class Request {
  @IsNotEmpty()
  userId: string;
}
