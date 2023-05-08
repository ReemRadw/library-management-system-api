/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUser, SignIn } from './dto/create.user.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  signup(@Body(ValidationPipe) dto: CreateUser, @Res() res: Response) {
    return this.authService.signup(res, dto);
  }

  @Post('signin')
  @ApiCreatedResponse({
    description: 'user signIn',
  })
  @ApiResponse({
    status: 200,
    description: 'access Token',
    type: String,
  })
  @ApiBody({ type: SignIn })
  signin(@Body(ValidationPipe) dto: SignIn, @Res() res: Response) {
    return this.authService.signin(dto, res);
  }
}
