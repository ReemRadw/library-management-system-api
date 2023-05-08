/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { PrismaService } from 'src/prisma.service';
import { CreateReaderDto } from './dto/create.reader.dto';
import { Role } from '@prisma/client';
import { ManageReaderService } from './manageReader.service';
import { UpdateReaderDto } from './dto/update.reader.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
@ApiTags('manageReader')
@Controller('manageReader')
export class ManageReaderController {
  constructor(
    private prisma: PrismaService,
    private readonly manageReaderService: ManageReaderService,
  ) {}
  @Post('/createReader')
  @UseGuards(AuthGuard)
  @Roles(Role.admin)
  async createReader(
    @Body(ValidationPipe)
    createReaderDto: CreateReaderDto,
    @Res() res: Response,
  ) {
    return this.manageReaderService.createReader(createReaderDto, res);
  }
  @Get('getAll')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  async getAll() {
    return await this.manageReaderService.getAll();
  }

  @Get('readReader/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  async readReader(@Param('id') id: string, @Res() res: Response) {
    return await this.manageReaderService.readReader(id, res);
  }

  @Delete('/deleteReader/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  removeReader(@Param('id') id: string, @Res() res: Response) {
    return this.manageReaderService.removeReader(id, res);
  }

  @Patch('/updateReader/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  updateReader(
    @Param('id') id: string,
    @Body() updateReaderDto: UpdateReaderDto,
    @Res() res: Response,
  ) {
    return this.manageReaderService.updateReader(id, updateReaderDto, res);
  }

  @Patch('/activateReader/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  activateReader(@Param('id') id: string, @Res() res: Response) {
    return this.manageReaderService.activateReader(res, id);
  }

  @Get('/requestsHistory/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  getHistory(@Param('id') id: string, @Res() res: Response) {
    return this.manageReaderService.getHistory(id, res);
  }
}
