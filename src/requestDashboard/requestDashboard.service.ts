/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRequest } from './dto/create.request.dto';
import { ResponseService } from 'src/response.service';

@Injectable()
export class RequestDashboardService {
  constructor(private prisma: PrismaService) {}
  async createRequest(res, createRequest: CreateRequest, Id: string) {
    const { userId, bookId } = createRequest;
    const IsBook = await this.prisma.book.findUnique({
      where: {
        id: Id,
      },
    });
    if (!IsBook) {
      return ResponseService.badRequest(
        res,
        'bad incredentials',
        'there is no book with this id',
      );
    }
    const request = await this.prisma.request.create({
      data: {
        userId,
        bookId,
      },
    });
    return ResponseService.success(res, 'Request created successfully', {
      request,
    });
  }
  async getAll() {
    return await this.prisma.request.findMany({});
  }

  async readRequest(Id: string, res) {
    const request = await this.prisma.request.findUnique({
      where: {
        id: Id,
      },
    });
    if (!request) {
      return ResponseService.badRequest(
        res,
        'bad incredentials',
        'there is no Request with this id',
      );
    }
    return ResponseService.success(res, 'Request data', request);
  }

  async acceptRequest(res, Id: string) {
    const request = await this.prisma.request.update({
      where: {
        id: Id,
      },
      data: {
        status: 'Accepted',
      },
    });
    return ResponseService.success(res, ' Request Accepted', { request });
  }

  async declineRequest(res, Id: string) {
    const request = await this.prisma.request.update({
      where: {
        id: Id,
      },
      data: {
        status: 'Rejected',
      },
    });
    return ResponseService.success(res, ' Request Rejected', { request });
  }

  async deleteRequest(Id: string, res) {
    const IsRequest = await this.prisma.request.findUnique({
      where: {
        id: Id,
      },
    });

    if (!IsRequest) {
      return ResponseService.badRequest(
        res,
        'bad incredentials',
        'there is no request with this id',
      );
    }
    const request = await this.prisma.request.delete({
      where: {
        id: Id,
      },
    });
    return ResponseService.success(
      res,
      'Request deleted successfully',
      request,
    );
  }
}
