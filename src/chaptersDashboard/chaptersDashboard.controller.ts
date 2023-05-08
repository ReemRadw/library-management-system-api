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
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/roles.decorator';
import { CreateChaptersDto } from './dto/create.chapters.dto';
import { ChaptersdashboardService } from './chaptersDashboard.service';
import { UpdateChaptersDto } from './dto/update.chapters.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('chaptersDashboard')
@Controller('chaptersDashboard')
export class ChaptersDashboardController {
  constructor(
    private readonly chaptersDashboardService: ChaptersdashboardService,
  ) {}
  @Post('/createChapters')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  async createChapters(
    @Body(ValidationPipe)
    createChaptersDto: CreateChaptersDto,
    @Res() res: Response,
  ) {
    return await this.chaptersDashboardService.createChapters(
      res,
      createChaptersDto,
    );
  }
  @Get('getAll')
  async getAll() {
    return await this.chaptersDashboardService.getAll();
  }

  @Get('readchapter/:id')
  async readchapters(@Param('id') id: string, @Res() res: Response) {
    return await this.chaptersDashboardService.readChapters(id, res);
  }

  @Delete('/deleteChapters/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  removeChapters(@Param('id') id: string, @Res() res: Response) {
    return this.chaptersDashboardService.removeChapters(id, res);
  }

  @Patch('/updateChapters/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  updateChapters(
    @Param('id') id: string,
    @Body() updateChapetrsDto: UpdateChaptersDto,
    @Res() res: Response,
  ) {
    return this.chaptersDashboardService.updateChapters(
      id,
      updateChapetrsDto,
      res,
    );
  }
}
