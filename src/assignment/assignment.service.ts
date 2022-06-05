import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { AssignmentEntity } from 'src/entity/Assignment.entity';
import { SubjectClassEntity } from 'src/entity/SubjectClass.entity';
import { Repository } from 'typeorm';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(AssignmentEntity)
    private assiRep: Repository<AssignmentEntity>,
    @InjectRepository(SubjectClassEntity)
    private subClassRep: Repository<SubjectClassEntity>,
  ) {}
  async create(createAssignmentDto: CreateAssignmentDto) {
    const subject = await this.subClassRep.findOne(
      createAssignmentDto.subject_class_id,
    );

    if (!subject) {
      return {
        error: 'Subject class is not exist !',
        status: HttpStatus.BAD_REQUEST,
      };
    }

    const assigment = new AssignmentEntity();
    assigment.desc = createAssignmentDto.desc;
    assigment.content = createAssignmentDto.content;
    assigment.attachment = createAssignmentDto.attachment;
    assigment.subject_class = subject;
    console.log(createAssignmentDto.deadline);
    assigment.deadline = moment.utc(createAssignmentDto.deadline).toDate();

    await this.assiRep.save(assigment);

    return assigment;
  }

  async findAll() {
    return await this.assiRep.find();
  }

  async findOne(id: number) {
    return await this.assiRep.findOne(id);
  }

  update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    return `This action updates a #${id} assignment`;
  }

  async remove(id: number) {
    try {
      const d = await this.assiRep.findOne(id);
      await d.remove();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
