import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [UserModule, RolesModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
