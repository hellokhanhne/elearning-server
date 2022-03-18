import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacultyEntity } from 'src/entity/Faculty.entity';
import { Repository } from 'typeorm';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';

@Injectable()
export class FacultyService {
  constructor(
    @InjectRepository(FacultyEntity)
    private facultyRep: Repository<FacultyEntity>,
  ) {}
  async create(createFacultyDto: CreateFacultyDto) {
    try {
      const faculty = new FacultyEntity();
      faculty.faculty_name = createFacultyDto.faculty_name;
      faculty.faculty_email = createFacultyDto.faculty_email;
      await this.facultyRep.save(faculty);
      return faculty;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    const faculties = await this.facultyRep.find();
    return faculties;
  }

  async findOne(id: number) {
    const faculty = await this.facultyRep.findOne(id);
    return faculty;
  }

  async update(id: number, updateFacultyDto: UpdateFacultyDto) {
    try {
      const faculty = await this.facultyRep.findOne(id);
      faculty.faculty_name = updateFacultyDto.faculty_name;
      faculty.faculty_email = updateFacultyDto.faculty_email;
      await this.facultyRep.save(faculty);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    const faculty = await this.facultyRep.findOne(id);
    if (!faculty) return false;
    await this.facultyRep.remove(faculty);
    return true;
  }
}
