import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LecturersEntity } from 'src/entity/Lecturers.entity';
import { PermissionEntity } from 'src/entity/Permission.entity';
import { RoleEntity } from 'src/entity/Role.entity';
import { StudentEntity } from 'src/entity/Student.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies';
import { RefreshTokenStrategy } from './strategies/refresh_token.stategy';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      StudentEntity,
      PermissionEntity,
      RoleEntity,
      LecturersEntity,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthModule],
})
export class AuthModule {}
