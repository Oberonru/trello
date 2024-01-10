import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import { RolesEntity } from 'src/roles/roles.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (user === null) {
      const role = await this.rolesRepository.findOne({
        where: {
          name: 'user',
        },
      });

      const newUser = new UserEntity();

      newUser.roles = [role];

      Object.assign(newUser, dto);

      this.userRepository.save(newUser);

      const payload = { userId: newUser.id, roles: newUser.roles };

      return await this.jwtService.signAsync(payload, { secret: 'secret' });
    }
    throw new ForbiddenException();
  }

  async login(dto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (user !== null) {
      const isEqual = bcrypt.compare(dto.password, user.password);
      if (isEqual) {
        const payload = { userId: user.id };
        return await this.jwtService.signAsync(payload, { secret: 'secret' });
      }
    }

    throw new ForbiddenException();
  }
}
