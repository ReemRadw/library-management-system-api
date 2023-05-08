/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReaderDashboardService } from './readerDashboard.service';
import { CreateRequest } from 'src/requestDashboard/dto/create.request.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('readerDashboard')
@Controller('readerDashboard')
export class ReaderDashboardController {
  constructor(
    private readonly readerDashboardService: ReaderDashboardService,
  ) {}
  @Get('/viewBooks/:id')
  async viewBooks(@Param('id') id: string, @Res() res: Response) {
    return await this.readerDashboardService.viewBook(id, res);
  }
  @Get('filterBook')
  async filterBook(
    @Res() res: Response,
    @Query('categoryId') categoryId?: string,
    @Query('authorId') authorId?: string,
  ) {
    return await this.readerDashboardService.filterBook(
      res,
      categoryId,
      authorId,
    );
  }
  @Post('sendRequest/:id')
  async sendRequest(
    @Res() res: Response,
    @Body() createRequest: CreateRequest,
    @Param('id') id: string,
  ) {
    return await this.readerDashboardService.sendRequest(
      res,
      createRequest,
      id,
    );
  }
  @Get('search/:bookName')
  @UseGuards(AuthGuard)
  search(
    @Res() res: Response,
    @Param('bookName') bookName: string,
    @Req() req: any,
  ) {
    return this.readerDashboardService.search(res, bookName, req);
  }

  @Get('getMySearch')
  @UseGuards(AuthGuard)
  getMySearch(@Res() res: Response, @Req() req: any) {
    return this.readerDashboardService.getMySearch(res, req);
  }
}
