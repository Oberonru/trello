import { Module } from '@nestjs/common';
import { RolesEntity } from './roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity])],
  providers: [],
  exports: [TypeOrmModule],
})
export class RolesModule {}
