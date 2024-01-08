import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepositoru: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: AuthDto) {
    const user = await this.userRepositoru.findOne({
      where: {
        email: dto.email,
      },
    });

    if (user === null) {
      const newUser = new UserEntity();
      Object.assign(newUser, dto);

      this.userRepositoru.save(newUser);

      const payload = { userId: newUser.id };

      return await this.jwtService.signAsync(payload, { secret: 'secret' });
    }
    throw new ForbiddenException();
  }
}
