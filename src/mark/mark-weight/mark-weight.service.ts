import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarkWeightEntity } from 'src/entity/Mark_weight.entity';
import { Repository } from 'typeorm';
import { CreateMarkWeightDto } from './dto/create-mark-weight.dto';
import { UpdateMarkWeightDto } from './dto/update-mark-weight.dto';

@Injectable()
export class MarkWeightService {
  constructor(
    @InjectRepository(MarkWeightEntity)
    private markWeightRep: Repository<MarkWeightEntity>,
  ) {}
  create(createMarkWeightDto: CreateMarkWeightDto) {
    try {
    } catch (error) {}
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
