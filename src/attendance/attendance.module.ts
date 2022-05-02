import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from 'src/entity/Student.entity';
import { AttendanceEntity } from 'src/entity/Attendance';
import { TimeTableEntity } from 'src/entity/Timetable.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentEntity,
      AttendanceEntity,
      TimeTableEntity,
    ]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
