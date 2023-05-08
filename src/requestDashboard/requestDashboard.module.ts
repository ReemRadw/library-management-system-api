/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RequestDashboardController } from './requestDashboard.controller';
import { PrismaService } from 'src/prisma.service';
import { TokenService } from 'src/auth/token.service';
import { RequestDashboardService } from './requestDashboard.service';

@Module({
  imports: [],
  controllers: [RequestDashboardController],
  providers: [PrismaService, TokenService, RequestDashboardService],
})
export class RequestDashboardModule {}
