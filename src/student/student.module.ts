import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from 'src/entity/Student.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RoleEntity } from 'src/entity/Role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity, RoleEntity]), AuthModule],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentModule],
})
export class StudentModule {}
