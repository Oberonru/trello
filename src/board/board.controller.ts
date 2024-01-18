import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('users/:userId/boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async createBoard(@Query('name') name: string, @Req() request: Request) {
    const { userId } = request['userPayload'];

    return this.boardService.createBoard(name, userId);
  }

  @Get(':boardId')
  getBoard(@Param('userId') userId: number, @Req() request: Request) {
    if (!this.isMe(userId, request)) {
      throw new ForbiddenException();
    }
    return this.boardService.getBoard();
  }

  private isMe(id: number, request: Request): boolean {
    const { userId } = request['userPayload'];

    return userId === Number(id);
  }
}
