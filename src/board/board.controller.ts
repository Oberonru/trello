import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ColumnService } from './board.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('users/:userId/columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post('create_column')
  createColumn(@Param('userId') userId: number, @Req() request: Request) {
    if (!this.isMe(userId, request)) {
      throw new ForbiddenException();
    }

    return this.columnService.createColumn(userId);
  }
  @Get(':columnId')
  getColumn(@Param('userId') userId: number, @Req() request: Request) {
    if (!this.isMe(userId, request)) {
      throw new ForbiddenException();
    }
    return this.columnService.getColumn();
  }

  private isMe(userId: number, request: Request): boolean {
    const { id } = request['userPayload'];
    return id === userId;
  }
}
