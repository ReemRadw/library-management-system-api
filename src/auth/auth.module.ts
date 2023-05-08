/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { ManageReaderService } from 'src/manageReader/manageReader.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 7 * 24 * 60 * 60 },
    }),
  ],
  controllers: [AuthController],
  providers: [PrismaService, TokenService, ManageReaderService, AuthService],
})
export class AuthModule {}
