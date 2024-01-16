import { Controller, Get, Post } from '@nestjs/common';
import { ColumnService } from './column.service';

@Controller('users/:userId/columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post('create_column')
  createColumn() {
    return this.columnService.createColumn();
  }
  @Get(':columnId')
  getColumn() {
    return this.columnService.getColumn();
  }
}
