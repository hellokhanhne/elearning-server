import { Injectable } from '@nestjs/common';
import { CreateMarkWeightDto } from './dto/create-mark-weight.dto';
import { UpdateMarkWeightDto } from './dto/update-mark-weight.dto';

@Injectable()
export class MarkWeightService {
  create(createMarkWeightDto: CreateMarkWeightDto) {
    return 'This action adds a new markWeight';
  }

  findAll() {
    return `This action returns all markWeight`;
  }

  findOne(id: number) {
    return `This action returns a #${id} markWeight`;
  }

  update(id: number, updateMarkWeightDto: UpdateMarkWeightDto) {
    return `This action updates a #${id} markWeight`;
  }

  remove(id: number) {
    return `This action removes a #${id} markWeight`;
  }
}
