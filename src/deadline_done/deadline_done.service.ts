import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentEntity } from 'src/entity/Assignment.entity';
import { DealineDone } from 'src/entity/DealineDone';
import { StudentEntity } from 'src/entity/Student.entity';
import { Repository } from 'typeorm';
import { CreateDeadlineDoneDto } from './dto/create-deadline_done.dto';
import { UpdateDeadlineDoneDto } from './dto/update-deadline_done.dto';

@Injectable()
export class DeadlineDoneService {
  constructor(
    @InjectRepository(DealineDone) private delRep: Repository<DealineDone>,
    @InjectRepository(AssignmentEntity)
    private assiRep: Repository<AssignmentEntity>,
    @InjectRepository(StudentEntity)
    private stdRep: Repository<StudentEntity>,
  ) {}
  async create(createDeadlineDoneDto: CreateDeadlineDoneDto, userId: number) {
    try {
      const user = await this.stdRep.findOne(userId);

      const assigment = await this.assiRep.findOne(
        createDeadlineDoneDto.assigment_id,
      );

      if (!assigment) {
        return {
          error: 'Assignment is not exist !',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      console.log(assigment);

      const deadline_done = new DealineDone();
      deadline_done.attachment = createDeadlineDoneDto.attachment;
      deadline_done.student = user;
      deadline_done.assigment = assigment;

      console.log(deadline_done);

      await this.delRep.save(deadline_done);
      return deadline_done;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.delRep.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} deadlineDone`;
  }

  update(id: number, updateDeadlineDoneDto: UpdateDeadlineDoneDto) {
    return `This action updates a #${id} deadlineDone`;
  }

  remove(id: number) {
    return `This action removes a #${id} deadlineDone`;
  }
}
