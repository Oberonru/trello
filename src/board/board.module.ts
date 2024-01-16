import { Module } from '@nestjs/common';
import { ColumnController } from './board.controller';
import { ColumnService } from './board.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [ColumnController],
  providers: [ColumnService],
})
export class ColumnModule {}
