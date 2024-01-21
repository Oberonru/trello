import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly httpService: HttpService,
  ) {}

  async createBoard(name: string, userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    const url = `${process.env.TRELLO_URL}1/boards/?name=${name}&key=${process.env.TRELLO_KEY}&token=${user.accessToken}`;
    let data;

    try {
      const response = await firstValueFrom(this.httpService.post(url, {}));

      data = response.data;
    } catch (error) {
      throw error;
    }

    return data;
  }

  async getBoardsThatMember(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const url = `${process.env.TRELLO_URL}1/members/me/boards?key=${process.env.TRELLO_KEY}&token=${user.accessToken}`;
    let data;
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      data = response.data;
    } catch (error) {
      throw error;
    }
    return data;
  }
}
