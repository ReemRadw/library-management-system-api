/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChaptersDashboardModule } from './chaptersDashboard/chaptersDashboard.module';
import { ManageReaderModule } from './manageReader/manageReader.module';
import { RequestDashboardModule } from './requestDashboard/requestDashboard.module';
import { ReaderDashboardModule } from './readerDashboard/readerDashboard.module';
import { BookDashboardModule } from './bookDashboard/bookDashboard.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    RequestDashboardModule,
    ReaderDashboardModule,
    AuthModule,
    BookDashboardModule,
    ChaptersDashboardModule,
    MulterModule.register({ dest: './uploads' }),
    ManageReaderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
