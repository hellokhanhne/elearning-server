import { Injectable } from '@nestjs/common';
import { CreateMarkTypeDto } from './dto/create-mark-type.dto';
import { UpdateMarkTypeDto } from './dto/update-mark-type.dto';

@Injectable()
export class MarkTypeService {
  create(createMarkTypeDto: CreateMarkTypeDto) {
    return 'This action adds a new markType';
  }

  findAll() {
    return `This action returns all markType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} markType`;
  }

  update(id: number, updateMarkTypeDto: UpdateMarkTypeDto) {
    return `This action updates a #${id} markType`;
  }

  remove(id: number) {
    return `This action removes a #${id} markType`;
  }
}
