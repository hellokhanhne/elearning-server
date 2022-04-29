import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LecturersEntity } from 'src/entity/Lecturers.entity';
import { StudentEntity } from 'src/entity/Student.entity';
import { SubjectEntity } from 'src/entity/Subject.entity';
import { SubjectClassEntity } from 'src/entity/SubjectClass.entity';
import { Repository } from 'typeorm';
import { CreateSubjectClassDto } from './dto/create-subject-class.dto';
import {
  UpdateStudentClassDto,
  UpdateSubjectClassDto,
} from './dto/update-subject-class.dto';

@Injectable()
export class SubjectClassService {
  constructor(
    @InjectRepository(SubjectClassEntity)
    private subclassRep: Repository<SubjectClassEntity>,
    @InjectRepository(LecturersEntity)
    private lecturerRep: Repository<LecturersEntity>,
    @InjectRepository(SubjectEntity)
    private subjectRep: Repository<SubjectEntity>,
    @InjectRepository(StudentEntity)
    private studentRep: Repository<StudentEntity>,
  ) {}
  async create(createSubjectClassDto: CreateSubjectClassDto) {
    try {
      const leturer = await this.lecturerRep.findOne(
        createSubjectClassDto.lecturer_id,
      );
      const subject = await this.subjectRep.findOne(
        createSubjectClassDto.subject_id,
      );
      if (!leturer) {
        return {
          error: "Can't find leturer !",
          status: HttpStatus.BAD_REQUEST,
        };
      }
      const subjectClass = new SubjectClassEntity();
      subjectClass.subject_class_name =
        createSubjectClassDto.subject_class_name;
      subjectClass.subject_class_short_name =
        createSubjectClassDto.subject_class_short_name;
      subjectClass.school_year = createSubjectClassDto.school_year;
      subjectClass.semester = createSubjectClassDto.semester;
      subjectClass.date_start = createSubjectClassDto.date_start;
      subjectClass.date_end = createSubjectClassDto.date_end;
      subjectClass.subject_class_students = [];
      subjectClass.subject_class_timetable = null;
      subjectClass.subject_class_leturer = leturer;

      subjectClass.subject = subject;
      subjectClass.mark_weight = [];
      await this.subclassRep.save(subjectClass);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    const subjectClasses = await this.subclassRep.find({
      relations: ['subject_class_students', 'subject_class_timetable'],
    });
    return subjectClasses;
  }

  async findOne(id: number) {
    const subjectClass = await this.subclassRep.findOne(id);
    return subjectClass;
  }

  async update(id: number, updateSubjectClassDto: UpdateSubjectClassDto) {
    try {
      const subjectClass = await this.subclassRep.findOne(id);
      if (!subjectClass) {
        return {
          error: "Can't not find subject class",
          status: HttpStatus.BAD_REQUEST,
        };
      }
      const leturer = await this.lecturerRep.findOne(
        updateSubjectClassDto.lecturer_id,
      );
      if (!leturer) {
        return {
          error: "Can't find leturer !",
          status: HttpStatus.BAD_REQUEST,
        };
      }
      subjectClass.subject_class_name =
        updateSubjectClassDto.subject_class_name;
      subjectClass.subject_class_short_name =
        updateSubjectClassDto.subject_class_short_name;
      subjectClass.school_year = updateSubjectClassDto.school_year;
      subjectClass.semester = updateSubjectClassDto.semester;
      subjectClass.date_start = updateSubjectClassDto.date_start;
      subjectClass.date_end = updateSubjectClassDto.date_end;
      subjectClass.subject_class_students = [];
      subjectClass.subject_class_timetable = null;
      subjectClass.subject_class_leturer = leturer;
      subjectClass.mark_weight = [];
      await this.subclassRep.save(subjectClass);
    } catch (error) {
      console.log(error);
    }
  }

  async updateStudentsClass(id: number, updateDto: UpdateStudentClassDto) {
    try {
      const subjectClass = await this.subclassRep.findOne(id);
      const students = await this.studentRep.findByIds(updateDto.student_ids);

      subjectClass.subject_class_students = students;
      await subjectClass.save();
      return subjectClass;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    try {
      const subjectClass = await this.subclassRep.findOne(id);
      await this.subclassRep.remove(subjectClass);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
