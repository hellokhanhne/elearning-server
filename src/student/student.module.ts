import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from 'src/entity/Student.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RoleEntity } from 'src/entity/Role.entity';
import { RoleService } from 'src/role/role.service';
import { PermissionModule } from 'src/permission/permission.module';
import { PermissionService } from 'src/permission/permission.service';
import { PermissionEntity } from 'src/entity/Permission.entity';
import { ClassEntity } from 'src/entity/Class.entity';
import { SubjectClassEntity } from 'src/entity/SubjectClass.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentEntity,
      RoleEntity,
      PermissionEntity,
      ClassEntity,
      SubjectClassEntity,
    ]),
    AuthModule,
    PermissionModule,
  ],
  controllers: [StudentController],
  providers: [StudentService, RoleService, PermissionService],
  exports: [StudentModule],
})
export class StudentModule {}
