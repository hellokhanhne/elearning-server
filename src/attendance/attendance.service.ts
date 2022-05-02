import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceEntity } from 'src/entity/Attendance';
import { StudentEntity } from 'src/entity/Student.entity';
import { TimeTableEntity } from 'src/entity/Timetable.entity';
import { IErrorMsg } from 'src/utils/Error.interface';
import { Repository } from 'typeorm';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceEntity)
    private attendRep: Repository<AttendanceEntity>,
    @InjectRepository(StudentEntity)
    private studentRep: Repository<StudentEntity>,
    @InjectRepository(TimeTableEntity)
    private timetableRep: Repository<TimeTableEntity>,
  ) {}
  async create(
    createAttendanceDto: CreateAttendanceDto,
  ): Promise<AttendanceEntity | IErrorMsg> {
    try {
      const timetable = await this.timetableRep.findOne(
        createAttendanceDto.timetable_id,
      );
      if (!timetable) {
        return {
          error: 'Timetable is not found !',
          status: HttpStatus.BAD_REQUEST,
        };
      }
      const students = await this.studentRep.findByIds(
        createAttendanceDto.students,
      );
      const attendance = new AttendanceEntity();
      attendance.attendance_check = true;
      attendance.attendance_desc = createAttendanceDto.attendance_desc;
      attendance.attendance_date = createAttendanceDto.attendance_date;
      attendance.attendance_students_absent = students;
      attendance.timetable = timetable;
      await this.attendRep.save(attendance);
      return attendance;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    const attendances = await this.attendRep.find();
    return attendances;
  }

  findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
