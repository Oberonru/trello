import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';
import { ConfigModule } from '@nestjs/config';
import { TrelloModule } from './trello/trello.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ConfigModule.forRoot(),
    AuthModule,
    TrelloModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
