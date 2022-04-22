import { Module } from '@nestjs/common';
import { SubjectClassService } from './subject-class.service';
import { SubjectClassController } from './subject-class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectClassEntity } from 'src/entity/SubjectClass.entity';
import { LecturersEntity } from 'src/entity/Lecturers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectClassEntity, LecturersEntity])],
  controllers: [SubjectClassController],
  providers: [SubjectClassService],
})
export class SubjectClassModule {}
