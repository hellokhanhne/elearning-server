import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LecturersEntity } from 'src/entity/Lecturers.entity';
import { LevelEntity } from 'src/entity/Level.entity';
import { RoleEntity } from 'src/entity/Role.entity';
import { LevelService } from 'src/level/level.service';
import { RoleService } from 'src/role/role.service';
import { LecturersController } from './lecturers.controller';
import { LecturersService } from './lecturers.service';
import { PermissionModule } from '../permission/permission.module';
import { PermissionService } from 'src/permission/permission.service';
import { PermissionEntity } from 'src/entity/Permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LecturersEntity,
      LevelEntity,
      RoleEntity,
      PermissionEntity,
    ]),
    PermissionModule,
  ],
  controllers: [LecturersController],
  providers: [LecturersService, LevelService, RoleService, PermissionService],
})
export class LecturersModule {}
