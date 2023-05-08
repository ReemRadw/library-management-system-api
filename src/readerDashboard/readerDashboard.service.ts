/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { BookDashboardService } from 'src/bookDashboard/bookDashboard.service';
import { PrismaService } from 'src/prisma.service';
import { CreateRequest } from 'src/requestDashboard/dto/create.request.dto';
import { RequestDashboardService } from 'src/requestDashboard/requestDashboard.service';
import { ResponseService } from 'src/response.service';

@Injectable()
export class ReaderDashboardService {
  constructor(
    private prisma: PrismaService,
    private bookDashboardService: BookDashboardService,
    private requestDashboardService: RequestDashboardService,
  ) {}

  async viewBook(Id: string, res) {
    return this.bookDashboardService.readBook(Id, res);
  }

  async filterBook(res, categoryId, authorId) {
    const books = await this.prisma.book.findMany({
      where: {
        categoryId,
        authorId,
      },
    });

    return ResponseService.success(res, 'books filteration', books);
  }

  async sendRequest(res, createRequest: CreateRequest, Id: string) {
    return await this.requestDashboardService.createRequest(
      res,
      createRequest,
      Id,
    );
  }

  async search(res, bookName: string, req) {
    const email = req.user.sub;
    const books = await this.prisma.book.findMany({
      where: { bookName: { contains: bookName } },
    });
    await this.prisma.search.create({
      data: {
        bookName,
        userEmail: email,
      },
    });
    return ResponseService.success(res, 'Books', books);
  }

  async getMySearch(res, req) {
    const email = req.user.sub;
    const search = await this.prisma.search.findMany({
      where: {
        userEmail: email,
      },
    });
    return ResponseService.success(res, 'search History', search);
  }
}
