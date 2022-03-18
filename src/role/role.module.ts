import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PermissionEntity } from 'src/entity/Permission.entity';
import { RoleEntity } from 'src/entity/Role.entity';
import { PermissionService } from 'src/permission/permission.service';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([RoleEntity, PermissionEntity]),
  ],
  controllers: [RoleController],
  providers: [RoleService, PermissionService],
  exports: [RoleModule, RoleService],
})
export class RoleModule {}
