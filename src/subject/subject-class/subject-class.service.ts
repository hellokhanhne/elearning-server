import { Injectable } from '@nestjs/common';
import { CreateSubjectClassDto } from './dto/create-subject-class.dto';
import { UpdateSubjectClassDto } from './dto/update-subject-class.dto';

@Injectable()
export class SubjectClassService {
  create(createSubjectClassDto: CreateSubjectClassDto) {
    return 'This action adds a new subjectClass';
  }

  findAll() {
    return `This action returns all subjectClass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subjectClass`;
  }

  update(id: number, updateSubjectClassDto: UpdateSubjectClassDto) {
    return `This action updates a #${id} subjectClass`;
  }

  remove(id: number) {
    return `This action removes a #${id} subjectClass`;
  }
}
