import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { TrelloController } from './trello.controller';
import { TrelloService } from './trello.service';

@Module({
  imports: [HttpModule, JwtModule, UserModule],
  controllers: [TrelloController],
  providers: [TrelloService],
})
export class TrelloModule {}
