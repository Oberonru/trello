import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepositoru: Repository<UserEntity>,
  ) {}

  async register() {
    return 'test';
  }
}
