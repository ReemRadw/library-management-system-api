/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChaptersdashboardService } from './chaptersDashboard.service';
import { ChaptersDashboardController } from './chaptersDashboard.controller';

@Module({
  imports: [],
  controllers: [ChaptersDashboardController],
  providers: [PrismaService, ChaptersdashboardService],
})
export class ChaptersDashboardModule {}
