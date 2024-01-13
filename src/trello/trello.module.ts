import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { TrelloController } from './trello.controller';
import { TrelloService } from './trello.service';

@Module({
  imports: [HttpModule, UserModule],
  controllers: [TrelloController],
  providers: [TrelloService],
})
export class TrelloModule {}
