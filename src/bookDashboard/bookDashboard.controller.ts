/* eslint-disable prettier/prettier */
import {
  Body,
  ConsoleLogger,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateBookDto } from './dto/create.book.dto';
import * as multer from 'multer';
import * as path from 'path';
import { BookDashboardService } from './bookDashboard.service';
import { UpdateBookDto } from './dto/update.book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { RolesGuard } from 'src/auth/roles.guard';
@ApiTags('bookDashboard')
@Controller('bookDashboard')
/* eslint-disable prettier/prettier */
export class BookDashboardController {
  constructor(private readonly bookDashboardService: BookDashboardService) {}
  @Post('/createBook')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination(req, file, callback) {
          const uploadPath = `./uploads/`;
          if (!existsSync('./uploads/')) {
            console.log('file exist');
            mkdirSync('./uploads/');
          }
          if (!existsSync(uploadPath)) {
            console.log('fielcreated');
            mkdirSync(uploadPath);
            console.log('file exist');
          }
          callback(null, uploadPath);
        },

        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  createBook(
    @Body() createBook: CreateBookDto,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('file', file);
    return this.bookDashboardService.createBook(res, createBook, file.filename);
  }

  @Get('/displayImg/:imageName')
  async displayImage(
    @Param('imageName') imageName: string,
    @Res() res: Response,
  ) {
    return this.bookDashboardService.displayImage(imageName, res);
  }

  @Get('getAll')
  async getAll() {
    return await this.bookDashboardService.getAll();
  }

  @Get('readBook/:id')
  async readBook(@Param('id') id: string, @Res() res: Response) {
    return await this.bookDashboardService.readBook(id, res);
  }

  @Delete('/deleteBook/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  removeBook(@Param('id') id: string, @Res() res: Response) {
    return this.bookDashboardService.removeBook(id, res);
  }

  @Patch('/updateBook/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Res() res: Response,
  ) {
    return this.bookDashboardService.updateBook(id, updateBookDto, res);
  }
}
