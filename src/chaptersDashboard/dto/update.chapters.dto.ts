/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateChaptersDto } from './create.chapters.dto';

export class UpdateChaptersDto extends PartialType(CreateChaptersDto) {}
