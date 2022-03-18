import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectTypeEntity } from 'src/entity/SubjectType.entity';
import { Repository } from 'typeorm';
import { CreateSubjectTypeDto } from './dto/create-subject-type.dto';
import { UpdateSubjectTypeDto } from './dto/update-subject-type.dto';

@Injectable()
export class SubjectTypeService {
  constructor(
    @InjectRepository(SubjectTypeEntity)
    private subTypeRep: Repository<SubjectTypeEntity>,
  ) {}
  async create(createSubjectTypeDto: CreateSubjectTypeDto) {
    try {
      const subjectType = new SubjectTypeEntity();
      subjectType.subject_type_name = createSubjectTypeDto.subject_type_name;
      await this.subTypeRep.save(subjectType);
      return subjectType;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    const subjectTypes = await this.subTypeRep.find();
    return subjectTypes;
  }

  async findOne(id: number) {
    const subjectType = await this.subTypeRep.findOne(id);
    return subjectType;
  }

  async update(id: number, updateSubjectTypeDto: UpdateSubjectTypeDto) {
    try {
      const subjectType = await this.subTypeRep.findOne(id);
      subjectType.subject_type_name = updateSubjectTypeDto.subject_type_name;
      await this.subTypeRep.save(subjectType);
      return subjectType;
    } catch (error) {
      console.log(error);
    }
    return `This action updates a #${id} subjectType`;
  }

  async remove(id: number) {
    try {
      const subjectType = await this.subTypeRep.findOne(id);
      await this.subTypeRep.remove(subjectType);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
