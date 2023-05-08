/* eslint-disable prettier/prettier */
import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
import { ResponseService } from 'src/response.service';
import { CreateBookDto } from './dto/create.book.dto';
import { UpdateBookDto } from './dto/update.book.dto';

/* eslint-disable prettier/prettier */
@Injectable()
export class BookDashboardService {
  constructor(private prisma: PrismaService) {}

  async createBook(res, createBook: CreateBookDto, fileName: string) {
    const {
      bookName,
      Description,
      authorId,
      categoryId,
      Field,
      publicationDate,
      PDF,
    } = createBook;
    const books = await this.prisma.book.create({
      data: {
        bookName,
        Description,
        authorId,
        categoryId,
        Field,
        publicationDate: new Date(publicationDate),
        PDF,
        imageUrl: fileName,
      },
    });
    return ResponseService.success(res, 'Book created successfully', {
      books,
    });
  }

  async displayImage(imageName, res) {
    return res.sendFile(`/uploads/${imageName}`, { root: process.cwd() });
  }

  async getAll() {
    return await this.prisma.book.findMany({});
  }

  async readBook(Id: string, res) {
    const book = await this.prisma.book.findUnique({
      where: {
        id: Id,
      },
    });
    if (!book) {
      return ResponseService.badRequest(
        res,
        'bad incredentials',
        'there is no book with this id',
      );
    }
    return ResponseService.success(res, 'Book data', book);
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  async removeBook(Id: string, res) {
    const IsBook = await this.prisma.book.findUnique({
      where: {
        id: Id,
      },
    });

    if (!IsBook) {
      return ResponseService.badRequest(res, 'bad incredentials', 'bad Id');
    }
    const book = await this.prisma.book.delete({
      where: {
        id: Id,
      },
    });
    return ResponseService.success(res, 'Book deleted successfully', book);
  }

  async updateBook(Id: string, updateBookDto: UpdateBookDto, res) {
    const {
      bookName,
      Description,
      authorId,
      categoryId,
      Field,
      publicationDate,
      PDF,
    } = updateBookDto;

    const IsBook = await this.prisma.book.findUnique({
      where: {
        id: Id,
      },
    });

    if (!IsBook) {
      return ResponseService.badRequest(res, 'bad incredentials', 'bad Id');
    }
    const book = await this.prisma.book.update({
      where: {
        id: Id,
      },
      data: {
        bookName,
        Description,
        authorId,
        categoryId,
        Field,
        publicationDate,
        PDF,
      },
    });

    return ResponseService.success(res, 'Book Updated successfully', book);
  }
}
