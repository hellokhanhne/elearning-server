import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from 'src/entity/Class.entity';
import { FacultyService } from 'src/faculty/faculty.service';
import { Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(ClassEntity) private classRep: Repository<ClassEntity>,
    private facultySer: FacultyService,
  ) {}
  async create(createClassDto: CreateClassDto) {
    try {
      const faculty = await this.facultySer.findOne(+createClassDto.faculty_id);
      if (!faculty) {
        return { error: 'Faculty is not found !', status: HttpStatus.CREATED };
      }
      const _class = new ClassEntity();
      _class.class_name = createClassDto.class_name;
      _class.class_faculty = faculty;
      await this.classRep.save(_class);
      return _class;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    const classes = await this.classRep.find();
    return classes;
  }

  async findOne(id: number) {
    const _class = await this.classRep.findOne(id);
    return _class;
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    try {
      const faculty = await this.facultySer.findOne(+updateClassDto.faculty_id);
      if (!faculty) {
        return { error: 'Faculty is not found !', status: HttpStatus.CREATED };
      }
      const _class = await this.classRep.findOne(id);
      _class.class_name = updateClassDto.class_name;
      _class.class_faculty = faculty;
      await this.classRep.save(_class);
      return _class;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    const _class = await this.classRep.findOne(id);
    if (!_class) {
      return false;
    }
    await this.classRep.remove(_class);
    return true;
  }
}
