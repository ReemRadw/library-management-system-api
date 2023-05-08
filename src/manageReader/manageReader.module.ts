/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ManageReaderController } from './manageReader.controller';
import { PrismaService } from 'src/prisma.service';
import { ManageReaderService } from './manageReader.service';

@Module({
  imports: [],
  controllers: [ManageReaderController],
  providers: [PrismaService, ManageReaderService],
})
export class ManageReaderModule {}
