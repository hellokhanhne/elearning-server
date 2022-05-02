import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectClassEntity } from 'src/entity/SubjectClass.entity';
import { TimeTableEntity } from 'src/entity/Timetable.entity';
import { IErrorMsg } from 'src/utils/Error.interface';
import { Repository } from 'typeorm';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';

@Injectable()
export class TimetableService {
  constructor(
    @InjectRepository(TimeTableEntity)
    private timetableRep: Repository<TimeTableEntity>,
    @InjectRepository(SubjectClassEntity)
    private subclassRep: Repository<SubjectClassEntity>,
  ) {}

  async create(
    createTimetableDto: CreateTimetableDto,
  ): Promise<TimeTableEntity | IErrorMsg> {
    try {
      const subject_class = await this.subclassRep.findOne(
        createTimetableDto.classroom_subject_class_id,
        {},
      );
      if (!subject_class) {
        return {
          error: "Can't not find subject class !",
          status: HttpStatus.BAD_REQUEST,
        };
      }
      const timetable = new TimeTableEntity();
      timetable.day_of_week = createTimetableDto.day_of_week;
      timetable.lession = createTimetableDto.lession;
      timetable.classroom = createTimetableDto.classroom;
      timetable.classroom_subject_class = subject_class;
      await this.timetableRep.save(timetable);
      return timetable;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    const timetables = await this.timetableRep.find({
      relations: [
        'classroom_subject_class',
        'classroom_subject_class.subject_class_students',
        'attendance',
        'attendance.attendance_students_absent',
      ],
    });
    return timetables;
  }

  async findOne(id: number) {
    const timetable = await this.timetableRep.findOne(id);
    return timetable;
  }

  async update(id: number, updateTimetableDto: UpdateTimetableDto) {
    try {
      const subject_class = await this.subclassRep.findOne(
        updateTimetableDto.classroom_subject_class_id,
      );
      if (!subject_class) {
        return {
          error: "Can't not find subject class !",
          status: HttpStatus.BAD_REQUEST,
        };
      }
      const timetable = new TimeTableEntity();
      timetable.day_of_week = updateTimetableDto.day_of_week;
      timetable.lession = updateTimetableDto.lession;
      timetable.classroom = updateTimetableDto.classroom;
      timetable.classroom_subject_class = subject_class;
      await this.timetableRep.save(timetable);
      return timetable;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    try {
      const timetable = await this.timetableRep.findOne(id);
      await this.timetableRep.remove(timetable);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
