import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [HttpModule, JwtModule, UserModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
