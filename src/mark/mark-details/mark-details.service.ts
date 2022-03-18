import { Injectable } from '@nestjs/common';
import { CreateMarkDetailDto } from './dto/create-mark-detail.dto';
import { UpdateMarkDetailDto } from './dto/update-mark-detail.dto';

@Injectable()
export class MarkDetailsService {
  create(createMarkDetailDto: CreateMarkDetailDto) {
    return 'This action adds a new markDetail';
  }

  findAll() {
    return `This action returns all markDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} markDetail`;
  }

  update(id: number, updateMarkDetailDto: UpdateMarkDetailDto) {
    return `This action updates a #${id} markDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} markDetail`;
  }
}
