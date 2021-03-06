import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { ClassEntity } from 'src/entity/Class.entity';
import { StudentEntity } from 'src/entity/Student.entity';
import { SubjectClassEntity } from 'src/entity/SubjectClass.entity';
import { RoleService } from 'src/role/role.service';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

const timeLesstion = {
  1: '07:30:00',
  2: '08:30:00',
  3: '09:30:00',
  4: '10:30:00',
  5: '11:30:00',
  6: '13:00:00',
  7: '14:00:00',
  8: '15:00:00',
  9: '16:00:00',
  10: '17:00:00',
};

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
    @InjectRepository(ClassEntity) private classRep: Repository<ClassEntity>,
    private roleSer: RoleService,
    @InjectRepository(SubjectClassEntity)
    private subjectClassRep: Repository<SubjectClassEntity>,
  ) {}
  async profile(student_email: string | any) {
    const user = await this.studentRepository.findOne({ student_email });
    return user;
  }

  async create(createStudentDto: CreateStudentDto) {
    const role = await this.roleSer.findOne(createStudentDto.role_id);
    if (!role)
      return { error: 'Role is not found !', status: HttpStatus.BAD_REQUEST };
    const _class = await this.classRep.findOne(createStudentDto.class_id);
    if (!this.classRep)
      return { error: 'Class is not found !', status: HttpStatus.BAD_REQUEST };
    const student = new StudentEntity();
    student.student_address = createStudentDto.student_address;
    student.student_avatar = createStudentDto.student_avatar;
    student.student_email = createStudentDto.student_email;
    student.student_fisrtName = createStudentDto.student_fisrtName;
    student.student_lastName = createStudentDto.student_lastName;
    student.student_mobile = createStudentDto.student_mobile;
    student.role = role;
    student.student_class = _class;
    await student.save();
    // console.log(student);
    // await this.studentRepository.save(student);
    return student;
  }

  async findAll() {
    const students = await this.studentRepository.find();
    return students;
  }

  async findOne(id: number) {
    const student = await this.studentRepository.findOne(id, {
      relations: ['role', 'student_class'],
    });

    return student;
  }

  async studentSubjectClass(idStudent: number) {
    // const data = [];
    const student = await this.studentRepository.findOne(idStudent, {
      relations: [
        'student_subject_classes',
        'student_subject_classes.subject_class_timetable',
      ],
    });
    //  for(const subjectClass of student.student_subject_classes ) {
    //     const timetable = await this.subjectClassRep.findOne(sub)
    //  }
    return student.student_subject_classes;
  }

  async studentTimetable(idStudent: number) {
    const toDay = moment.utc(Date.now()).tz('Asia/Saigon');

    const dates = Array.from(Array(7).keys()).map((idx) => {
      const d = new Date(
        toDay.year(),
        toDay.month(),
        toDay.date(),
        toDay.hours(),
        toDay.minutes(),
        toDay.seconds(),
        toDay.milliseconds(),
      );
      d.setDate(d.getDate() - d.getDay() + idx + 1);
      const lcds = d.toLocaleDateString().split('/');
      return `${lcds[2]}-${lcds[0]}-${lcds[1]}`;
    });

    const data = await this.getTimeTable(idStudent, dates);
    return data;
    // return {
    //   Monday: data.filter((d) => d.day_of_week === '2'),
    //   Tuesday: data.filter((d) => d.day_of_week === '3'),
    //   Wednesday: data.filter((d) => d.day_of_week === '4'),
    //   Thursday: data.filter((d) => d.day_of_week === '5'),
    //   Friday: data.filter((d) => d.day_of_week === '6'),
    //   Saturday: data.filter((d) => d.day_of_week === '7'),
    //   Sunday: data.filter((d) => d.day_of_week === '8'),
    // };
  }

  async getTimetableByDate(idStudent: number, start: string, end: string) {
    const dateStartQ = new Date(start);
    const dateEndQ = new Date(end);
    const momentDateStart = moment([
      dateStartQ.getFullYear(),
      dateStartQ.getMonth(),
      dateStartQ.getDate(),
    ]);
    const momentDateEnd = moment([
      dateEndQ.getFullYear(),
      dateEndQ.getMonth(),
      dateEndQ.getDate(),
    ]);
    const loopEnd = momentDateEnd.diff(momentDateStart, 'days');

    // console.log(
    //   momentDateStart.year(),
    //   momentDateStart.month(),
    //   momentDateStart.date(),
    // );

    const dateSubtract = momentDateStart.subtract(2, 'days');

    const _dates = Array.from(Array(loopEnd + 3).keys()).map((index) => {
      const d = moment([
        dateSubtract.year(),
        dateSubtract.month(),
        dateSubtract.date(),
      ]).add(index, 'days');

      return {
        [d.isoWeekday()]: `${d.year()}-${d.month() + 1}-${d.date()}`,
      };
    });

    const dates = {};

    _dates.forEach((d) => {
      let [key, value] = Object.entries(d)[0];
      dates[key] = value;
    });

    // console.log(dates);

    const data = await this.getTimeTable(idStudent, dates);
    // console.log(data);
    return data;
  }

  async studentTimetableNow(idStudent: number) {
    const data = [];

    const student = await this.studentRepository.findOne(idStudent, {
      relations: [
        'student_subject_classes',
        'student_subject_classes.subject_class_timetable',
        'student_subject_classes.subject_class_timetable.attendance',
        'student_subject_classes.subject_class_timetable.attendance.attendance_students_absent',
        'student_subject_classes.subject_class_leturer',
        'student_subject_classes.subject_class_leturer.leturer_level',
      ],
    });

    student.student_subject_classes.forEach((s) => {
      if (s.subject_class_timetable.length > 0) {
        s.subject_class_timetable.forEach((t) => {
          const {
            subject_class_name,
            subject_class_short_name,
            school_year,
            semester,
            date_start,
            date_end,
          } = s;
          data.push({
            ...t,
            subject_class_name,
            subject_class_short_name,
            school_year,
            semester,
            date_start,
            date_end,
            lecturer: s.subject_class_leturer,
          });
        });
      }
    });

    return data.filter(
      (d) =>
        d.day_of_week ===
        (moment.utc(Date.now()).tz('Asia/Saigon').day() + 1).toString(),
    );
  }

  async studentDealine(userId: number) {
    const data = [];
    const student = await this.studentRepository.findOne(userId, {
      relations: [
        'student_subject_classes',
        'dealines',
        'student_subject_classes.assignments',
        'student_subject_classes.assignments.deadlines',
      ],
    });
    const ids = student.dealines.map((d) => d.deadline_id);
    student.student_subject_classes.forEach((sb) => {
      if (sb.assignments.length > 0) {
        const {
          subject_class_id,
          subject_class_name,
          subject_class_leturer,
          subject_class_short_name,
        } = sb;
        sb.assignments.forEach((as) => {
          const _a = {
            ...as,
            subject_class_id,
            subject_class_name,
            subject_class_leturer,
            subject_class_short_name,
            deadline_done: as.deadlines.filter((d) =>
              ids.includes(d.deadline_id),
            ),
          };
          delete _a.deadlines;
          data.push(_a);
        });
      }
    });
    return data;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const role = await this.roleSer.findOne(updateStudentDto.role_id);
    if (!role)
      return { error: 'Role is not found !', status: HttpStatus.BAD_REQUEST };
    const _class = await this.classRep.findOne(updateStudentDto.class_id);
    if (!this.classRep)
      return { error: 'Class is not found !', status: HttpStatus.BAD_REQUEST };
    const student = await this.studentRepository.findOne(id);
    student.student_address = updateStudentDto.student_address;
    student.student_email = updateStudentDto.student_email;
    student.student_fisrtName = updateStudentDto.student_fisrtName;
    student.student_lastName = updateStudentDto.student_lastName;
    student.student_mobile = updateStudentDto.student_mobile;
    student.role = role;
    student.student_class = _class;
    if (updateStudentDto.student_avatar) {
      student.student_avatar = updateStudentDto.student_avatar;
    }
    await this.studentRepository.save(student);
    return student;
  }

  async remove(id: number) {
    try {
      const student = await this.studentRepository.findOne(id);

      await this.studentRepository.remove(student);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getTimeTable(idStudent: number, dates: any) {
    const isArray = Array.isArray(dates);
    const data = [];
    const student = await this.studentRepository.findOne(idStudent, {
      relations: [
        'student_subject_classes',
        'student_subject_classes.subject_class_leturer',
        'student_subject_classes.subject_class_timetable',
      ],
    });

    student.student_subject_classes.forEach((s) => {
      if (s.subject_class_timetable.length > 0) {
        s.subject_class_timetable.forEach((t) => {
          const {
            subject_class_name,
            subject_class_short_name,
            school_year,
            // semester,
            // date_start,
            // date_end,
          } = s;

          const [lesstionS, lesstionE] = t.lession.split('-');

          if (isArray) {
            data.push({
              ...t,
              subject_class_name,
              subject_class_short_name,
              school_year,
              // semester,
              // date_start,
              // date_end,
              lecturer: s.subject_class_leturer,
              time_start: `${dates[Number(t.day_of_week - 2)]} ${
                timeLesstion[lesstionS]
              }`,
              time_end: `${dates[Number(t.day_of_week - 2)]} ${
                timeLesstion[Number(lesstionE) + 1]
              }`,
            });
          } else {
            if (dates[Number(t.day_of_week - 1)]) {
              data.push({
                ...t,
                subject_class_name,
                subject_class_short_name,
                school_year,
                // semester,
                // date_start,
                // date_end,
                lecturer: s.subject_class_leturer,
                time_start: `${dates[Number(t.day_of_week - 1)]} ${
                  timeLesstion[lesstionS]
                }`,
                time_end: `${dates[Number(t.day_of_week - 1)]} ${
                  timeLesstion[Number(lesstionE) + 1]
                }`,
              });
            }
          }
        });
      }
    });
    return data;
  }
}
