import { Module } from '@nestjs/common';
import { SubjectClassService } from './subject-class.service';
import { SubjectClassController } from './subject-class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectClassEntity } from 'src/entity/SubjectClass.entity';
import { LecturersEntity } from 'src/entity/Lecturers.entity';
import { SubjectEntity } from 'src/entity/Subject.entity';
import { StudentEntity } from 'src/entity/Student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubjectClassEntity,
      LecturersEntity,
      SubjectEntity,
      StudentEntity,
    ]),
  ],
  controllers: [SubjectClassController],
  providers: [SubjectClassService],
})
export class SubjectClassModule {}
