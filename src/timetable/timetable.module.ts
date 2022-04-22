import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeTableEntity } from 'src/entity/Timetable.entity';
import { SubjectClassEntity } from 'src/entity/SubjectClass.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeTableEntity, SubjectClassEntity])],
  controllers: [TimetableController],
  providers: [TimetableService],
})
export class TimetableModule {}
