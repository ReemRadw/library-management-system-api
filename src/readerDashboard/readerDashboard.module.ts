/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ReaderDashboardController } from './readerDashboard.controller';
import { TokenService } from 'src/auth/token.service';
import { PrismaService } from 'src/prisma.service';
import { ReaderDashboardService } from './readerDashboard.service';
import { BookDashboardService } from 'src/bookDashboard/bookDashboard.service';
import { RequestDashboardService } from 'src/requestDashboard/requestDashboard.service';

@Module({
  imports: [],
  controllers: [ReaderDashboardController],
  providers: [
    PrismaService,
    BookDashboardService,
    RequestDashboardService,
    TokenService,
    ReaderDashboardService,
  ],
})
export class ReaderDashboardModule {}
