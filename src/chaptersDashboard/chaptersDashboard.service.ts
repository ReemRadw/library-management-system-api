/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ResponseService } from 'src/response.service';
import { CreateChaptersDto } from './dto/create.chapters.dto';
import { UpdateChaptersDto } from './dto/update.chapters.dto';

@Injectable()
export class ChaptersdashboardService {
  constructor(private prisma: PrismaService) {}
  async createChapters(res, createChapters: CreateChaptersDto) {
    const { title, description, bookId } = createChapters;
    const bookChapters = await this.prisma.bookChapters.create({
      data: {
        title,
        description,
        bookId,
      },
    });
    return ResponseService.success(res, 'BookChapters created successfully', {
      bookChapters,
    });
  }
  async getAll() {
    return await this.prisma.bookChapters.findMany({});
  }

  async readChapters(Id: string, res) {
    const chapter = await this.prisma.bookChapters.findUnique({
      where: {
        id: Id,
      },
    });
    if (!chapter) {
      return ResponseService.badRequest(
        res,
        'bad incredentials',
        'there is no chapter with this id',
      );
    }
    return ResponseService.success(res, 'chapter data', chapter);
  }

  async removeChapters(Id: string, res) {
    const IsChapter = await this.prisma.bookChapters.findUnique({
      where: {
        id: Id,
      },
    });

    if (!IsChapter) {
      return ResponseService.badRequest(res, 'bad incredentials', 'bad Id');
    }
    const chapters = await this.prisma.bookChapters.delete({
      where: {
        id: Id,
      },
    });
    return ResponseService.success(
      res,
      'BookChapters deleted successfully',
      chapters,
    );
  }

  async updateChapters(Id: string, updateChaptersDto: UpdateChaptersDto, res) {
    const { title, description, bookId } = updateChaptersDto;
    const IsChapter = await this.prisma.bookChapters.findUnique({
      where: {
        id: Id,
      },
    });

    if (!IsChapter) {
      return ResponseService.badRequest(res, 'bad incredentials', 'bad Id');
    }
    const chapters = await this.prisma.bookChapters.update({
      where: {
        id: Id,
      },
      data: {
        title,
        description,
        bookId,
      },
    });
    return ResponseService.success(
      res,
      'BookChapters Updated successfully',
      chapters,
    );
  }
}
