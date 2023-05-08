/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ResponseService } from 'src/response.service';
import { UpdateReaderDto } from './dto/update.reader.dto';
import { CreateUser } from 'src/auth/dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { CreateReaderDto } from './dto/create.reader.dto';
import { Response } from 'express';

@Injectable()
export class ManageReaderService {
  constructor(private prisma: PrismaService) {}

  async createReader(createReaderDto: CreateReaderDto, res: Response) {
    const newUser = await this.createUser(createReaderDto);
    if (newUser) {
      return ResponseService.success(res, 'User Created Successfully', newUser);
    }
    return ResponseService.conflict(res, 'User already exist');
  }

  async createUser(createUser: CreateUser) {
    const { email, password, phone } = createUser;
    const emailExist = await this.prisma.user.findUnique({
      where: { email },
    });
    if (emailExist) {
      return undefined;
    }
    const hashPassword = await bcrypt.hash(password, 8);
    const newUser = await this.prisma.user.create({
      data: {
        email,
        phone,
        password: hashPassword,
      },
    });
    return newUser;
  }
  async getAll() {
    return await this.prisma.user.findMany({
      where: {
        type: 'reader',
      },
    });
  }

  async readReader(Id: string, res) {
    const reader = await this.prisma.user.findUnique({
      where: {
        id: Id,
      },
    });
    if (!reader) {
      return ResponseService.badRequest(
        res,
        'bad incredentials',
        'there is no Reader with this id',
      );
    }
    return ResponseService.success(res, 'Reader data', reader);
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  async removeReader(Id: string, res) {
    const IsReader = await this.prisma.user.findUnique({
      where: {
        id: Id,
      },
    });

    if (!IsReader) {
      return ResponseService.badRequest(res, 'bad incredentials', 'bad Id');
    }
    const reader = await this.prisma.user.delete({
      where: {
        id: Id,
      },
    });
    return ResponseService.success(res, 'ٌReader deleted successfully', reader);
  }

  async updateReader(Id: string, updateReaderDto: UpdateReaderDto, res) {
    const { email, password, phone } = updateReaderDto;

    const IsReader = await this.prisma.user.findUnique({
      where: {
        id: Id,
      },
    });

    if (!IsReader) {
      return ResponseService.badRequest(res, 'bad incredentials', 'bad Id');
    }
    const reader = await this.prisma.user.update({
      where: {
        id: Id,
      },
      data: {
        email,
        password,
        phone,
      },
    });

    return ResponseService.success(res, 'Book Updated successfully', reader);
  }

  async activateReader(res, Id: string) {
    const reader = await this.prisma.user.update({
      where: {
        id: Id,
      },
      data: {
        status: 'Active',
      },
    });
    return ResponseService.success(res, ' Reader Activated', { reader });
  }

  async getHistory(Id: string, res) {
    const request = await this.prisma.user.findFirst({
      where: {
        id: Id,
      },
      select: {
        Request: {
          select: {
            id: true,
            Book: {
              select: {
                bookName: true,
              },
            },
          },
        },
      },
    });
    return ResponseService.success(res, 'user Requests history', request);
  }
}
