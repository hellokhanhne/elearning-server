import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarkTypeEntity } from 'src/entity/Mark_type.entity';
import { Repository } from 'typeorm';
import { CreateMarkTypeDto } from './dto/create-mark-type.dto';
import { UpdateMarkTypeDto } from './dto/update-mark-type.dto';

@Injectable()
export class MarkTypeService {
  constructor(
    @InjectRepository(MarkTypeEntity)
    private markTypeRep: Repository<MarkTypeEntity>,
  ) {}
  async create(createMarkTypeDto: CreateMarkTypeDto) {
    try {
      const markType = new MarkTypeEntity();
      markType.mark_type_name = createMarkTypeDto.mark_type_name;
      await this.markTypeRep.save(markType);
      return markType;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    const markTypes = await this.markTypeRep.find();
    return markTypes;
  }

  async findOne(id: number) {
    const markTypes = await this.markTypeRep.findOne(id);
    return markTypes;
  }

  async update(id: number, updateMarkTypeDto: UpdateMarkTypeDto) {
    try {
      const markType = await this.markTypeRep.findOne(id);
      markType.mark_type_name = updateMarkTypeDto.mark_type_name;
      await this.markTypeRep.save(markType);
      return markType;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    try {
      const markType = await this.markTypeRep.findOne(id);
      await this.markTypeRep.remove(markType);
      return true;
    } catch (error) {
      return false;
    }
  }
}
