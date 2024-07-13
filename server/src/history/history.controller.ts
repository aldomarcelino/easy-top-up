import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { AuthGuard } from '@nestjs/passport';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { History } from './schemas/history.schema';
import { CreateHistoryDto } from './dto/create-history.dto';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllHistory(
    @Query() query: ExpressQuery,
    @Req() req,
  ): Promise<{ history: History[]; count: number }> {
    return this.historyService.findAll(query, req.user);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createHistory(
    @Body()
    history: CreateHistoryDto,
    @Req() req,
  ): Promise<History> {
    return this.historyService.create(history, req.user);
  }

  @Get('total-amount')
  @UseGuards(AuthGuard())
  async getTotalAmount(@Req() req): Promise<{ totalAmount: number }> {
    return this.historyService.getTotalAmount(req.user);
  }
}
