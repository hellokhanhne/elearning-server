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
    return {
      Monday: data.filter((d) => d.day_of_week === '2'),
      Tuesday: data.filter((d) => d.day_of_week === '3'),
      Wednesday: data.filter((d) => d.day_of_week === '4'),
      Thursday: data.filter((d) => d.day_of_week === '5'),
      Friday: data.filter((d) => d.day_of_week === '6'),
      Saturday: data.filter((d) => d.day_of_week === '7'),
      Sunday: data.filter((d) => d.day_of_week === '8'),
    };
  }

  async studentTimetableNow(idStudent: number) {
    const data = [];

    const student = await this.studentRepository.findOne(idStudent, {
      relations: [
        'student_subject_classes',
        'student_subject_classes.subject_class_timetable',
        'student_subject_classes.subject_class_leturer',
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

    const d = new Date(moment.utc(Date.now()).tz('Asia/Saigon').toString());
    let day = d.getDay();

    return data.filter((d) => d.day_of_week === (day + 1).toString());
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
}
