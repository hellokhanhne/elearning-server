import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelEntity } from 'src/entity/Level.entity';
import { Repository } from 'typeorm';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(LevelEntity) private levelRep: Repository<LevelEntity>,
  ) {}
  async create(createLevelDto: CreateLevelDto): Promise<LevelEntity> {
    const level = new LevelEntity();
    level.level_name = createLevelDto.level_name;
    level.level_desc = createLevelDto.level_desc;
    await this.levelRep.save(level);
    return level;
  }

  async findAll(): Promise<LevelEntity[]> {
    const levels = await this.levelRep.find();
    return levels;
  }

  async findOne(id: number): Promise<LevelEntity> {
    const level = await this.levelRep.findOne(id);
    return level;
  }

  async update(
    id: number,
    updateLevelDto: UpdateLevelDto,
  ): Promise<LevelEntity> {
    const level = await this.levelRep.findOne(id);
    level.level_name = updateLevelDto.level_name;
    level.level_desc = updateLevelDto.level_desc;
    await this.levelRep.save(level);
    return level;
  }

  async remove(id: number): Promise<Boolean> {
    const level = await this.levelRep.findOne(id);
    if (!level) return false;
    await this.levelRep.remove(level);
    return true;
  }
}
