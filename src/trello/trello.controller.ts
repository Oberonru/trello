import { Controller, Get, Req, Res, Query, UseGuards } from '@nestjs/common';
import { TrelloService } from './trello.service';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('Trello')
@UseGuards(AuthGuard)
@Controller('trello')
export class TrelloController {
  constructor(private readonly trelloService: TrelloService) {}

  @Get('link')
  async link(@Res() response: Response) {
    const token = await this.trelloService.link();
    const url = `${process.env.AUTHORIZE_URL}?oauth_token=${token}&name=${process.env.APP_NAME}&scope=${process.env.SCOPE}&expiration=${process.env.EXPIRATION}`;

    console.log(url);

    response.redirect(url);
  }

  @Get('callback')
  callback(
    @Query('oauth_token') token: string,
    @Query('oauth_verifier') verifier: string,
    @Req() request: Request,
  ) {
    const { userId } = request['userPayload'];

    return this.trelloService.callback(token, verifier, userId);
  }
}
