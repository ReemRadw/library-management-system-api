/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TokenService } from 'src/auth/token.service';
import { PrismaService } from 'src/prisma.service';
import { BookDashboardController } from './bookDashboard.controller';
import { BookDashboardService } from './bookDashboard.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({ dest: './uploads/' })],
  controllers: [BookDashboardController],
  providers: [PrismaService, TokenService, BookDashboardService],
})
export class BookDashboardModule {}
