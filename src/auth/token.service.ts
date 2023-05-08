/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class TokenService {
  async createAccess(user: User) {
    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: 2 * 24 * 60 * 60,
    });

    return accessToken;
  }
  async createRefresh(user: User) {
    const refreshToken = jwt.sign(
      {
        userId: user.id,
        refresh: true,
      },
      process.env.JWT_SECRET,
      { expiresIn: 7 * 24 * 60 * 60 },
    );
    return refreshToken;
  }
}
