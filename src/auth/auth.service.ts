import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import { RolesEntity } from 'src/roles/roles.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepositoru: Repository<UserEntity>,
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: AuthDto) {
    const user = await this.userRepositoru.findOne({
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

      this.userRepositoru.save(newUser);

      const payload = { userId: newUser.id, roles: newUser.roles };

      return await this.jwtService.signAsync(payload, { secret: 'secret' });
    }
    throw new ForbiddenException();
  }
}
