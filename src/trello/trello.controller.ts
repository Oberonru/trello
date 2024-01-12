import { Controller, Get, Res } from '@nestjs/common';
import { TrelloService } from './trello.service';
import { Response } from 'express';

@Controller('trello')
export class TrelloController {
  constructor(private readonly trelloService: TrelloService) {}

  @Get('link')
  async link(@Res() response: Response) {
    const token = await this.trelloService.link();

    response.redirect(
      `${process.env.AUTHORIZE_URL}?oauth_token=${token}&name=${process.env.APP_NAME}
      &scope=${process.env.SCOPE}&expiration=${process.env.EXPIRATION}`,
    );
  }
}
