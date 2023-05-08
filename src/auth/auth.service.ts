/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUser, SignIn } from './dto/create.user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { TokenService } from './token.service';
import { ResponseService } from 'src/response.service';
import { ManageReaderService } from 'src/manageReader/manageReader.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  ResponseService: any;
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
    private manageReader: ManageReaderService,
    private jwtService: JwtService,
  ) {}
  async signup(res, createUser: CreateUser) {
    const newUser = await this.manageReader.createUser(createUser);
    if (!newUser) {
      return ResponseService.conflict(res, 'User already Exist');
    }
    const payload = { sub: createUser.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return ResponseService.success(res, 'Email created successfully', {
      newUser,
      accessToken,
    });
  }

  async signin(dto: SignIn, res) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      return ResponseService.badRequest(
        res,
        'bad incredentials',
        'Incorrect Email or Password',
      );
    }
    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) {
      return ResponseService.badRequest(
        res,
        'bad incredentials',
        'Incorrect Email or Password',
      );
    }
    const payload = { sub: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return ResponseService.success(res, 'signed In successfully', {
      user,
      accessToken,
    });
  }
}
