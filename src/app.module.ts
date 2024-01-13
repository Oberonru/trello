import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';
import { TrelloModule } from './trello/trello.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormconfig from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ConfigModule.forRoot(),
    HttpModule,
    AuthModule,
    TrelloModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
