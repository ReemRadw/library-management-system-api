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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestDashboardService } from './requestDashboard.service';
import { Roles } from 'src/auth/roles.decorator';
import { CreateRequest } from './dto/create.request.dto';
import { Role } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('requestDashboard')
@Controller('requestDashboard')
export class RequestDashboardController {
  constructor(
    private readonly requestDashboardService: RequestDashboardService,
  ) {}
  @Post('/createRequest/:id')
  async createRequest(
    @Res() res: Response,
    @Body() createRequest: CreateRequest,
    @Param('id') id: string,
  ) {
    return await this.requestDashboardService.createRequest(
      res,
      createRequest,
      id,
    );
  }

  @Get('getAll')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  async getAll() {
    return await this.requestDashboardService.getAll();
  }
  @Get('readRequest/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  async readRequest(@Param('id') id: string, @Res() res: Response) {
    return await this.requestDashboardService.readRequest(id, res);
  }

  @Delete('/deleteRequest/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  removeRequest(@Param('id') id: string, @Res() res: Response) {
    return this.requestDashboardService.deleteRequest(id, res);
  }

  @Get('/acceptRequest/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  acceptRequest(@Param('id') id: string, @Res() res: Response) {
    return this.requestDashboardService.acceptRequest(res, id);
  }
  @Get('/declineRequest/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  declineRequest(@Param('id') id: string, @Res() res: Response) {
    return this.requestDashboardService.declineRequest(res, id);
  }
}
