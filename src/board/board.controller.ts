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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Boards')
@UseGuards(AuthGuard)
@Controller('users/:userId/boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async createBoard(@Query('name') name: string, @Req() request: Request) {
    const { userId } = request['userPayload'];

    return this.boardService.createBoard(name, userId);
  }

  @Get()
  getBoardsThatMember(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    if (parseInt(userId) !== request['userPayload']['userId']) {
      throw new ForbiddenException();
    }

    return this.boardService.getBoardsThatMember(parseInt(userId));
  }

  private isMe(id: string, request: Request): boolean {
    const { userId } = request['userPayload'];

    return Number(id) === userId;
  }
}
