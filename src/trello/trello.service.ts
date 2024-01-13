import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as _oauth from 'oauth';

const oauth_secrets = {};
const loginCallback = `http://localhost:3000/trello/callback`;
const requestURL = 'https://trello.com/1/OAuthGetRequestToken';
const accessURL = 'https://trello.com/1/OAuthGetAccessToken';
const key = '3f06054f19b7002c4f55424fb1d20b26';
const secret =
  'd1d2e9849fb7abe6f444175bcb9f266a03720a6dc846d33b1c786a769dea0766';

const oauth = new _oauth.OAuth(
  requestURL,
  accessURL,
  key,
  secret,
  '1.0A',
  loginCallback,
  'HMAC-SHA1',
);

//так не работает, не могу понять почему
/* const oauth = new _oauth.OAuth(
  process.env.REQUEST_URL,
  process.env.ACCESS_URL,
  process.env.TRELLO_KEY,
  process.env.TRELLO_OAUTH_SECRET,
  '1.0A',
  process.env.LOGIN_CALLBACK,
  'HMAC-SHA1',
); */

@Injectable()
export class TrelloService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  link(): Promise<string> {
    return new Promise((resolve, rejects) => {
      oauth.getOAuthRequestToken((error, token, tokenSecret, results) => {
        oauth_secrets[token] = tokenSecret;
        resolve(token);
      });
    });
  }

  callback(token: string, verifier: string) {
    const tokenSecret = oauth_secrets[token];

    return new Promise((resolve, reject) => {
      oauth.getOAuthAccessToken(
        token,
        tokenSecret,
        verifier,
        async (error, accessToken, accessTokenSecret, results) => {
          const url = `https://api.trello.com/1/members/me/?key=${process.env.TRELLO_KEY}&token=${accessToken}`;
          const { data } = await firstValueFrom(this.httpService.get(url));
        },
      );
    });
  }
}
