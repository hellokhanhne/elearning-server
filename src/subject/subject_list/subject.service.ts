import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectEntity } from 'src/entity/Subject.entity';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity) private subRep: Repository<SubjectEntity>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    try {
      const subject = new SubjectEntity();
      subject.subject_name = createSubjectDto.subject_name;
      subject.subject_short_name = createSubjectDto.subject_short_name;
      subject.subject_desc = createSubjectDto.subject_desc;
      subject.subject_credits = createSubjectDto.subject_credits;
      subject.subject_img = createSubjectDto.subject_img;
      await this.subRep.save(subject);
      return subject;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    const subjects = await this.subRep.find();
    return subjects;
  }

  async findOne(id: number) {
    const subject = await this.subRep.findOne(id);
    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    try {
      const subject = await this.subRep.findOne(id);
      subject.subject_name = updateSubjectDto.subject_name;
      subject.subject_short_name = updateSubjectDto.subject_short_name;
      subject.subject_desc = updateSubjectDto.subject_desc;
      subject.subject_credits = updateSubjectDto.subject_credits;
      subject.subject_img = updateSubjectDto.subject_img;
      await this.subRep.save(subject);
      return subject;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    try {
      const subject = await this.subRep.findOne(id);
      await this.subRep.remove(subject);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
