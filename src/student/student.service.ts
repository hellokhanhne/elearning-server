import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from 'src/entity/Student.entity';
import { RoleService } from 'src/role/role.service';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
    private roleSer: RoleService,
  ) {}
  async profile(student_email: string | any) {
    const user = await this.studentRepository.findOne({ student_email });
    return user;
  }

  async create(createStudentDto: CreateStudentDto) {
    const role = await this.roleSer.findOne(createStudentDto.role_id);
    if (!role)
      return { error: 'Role is not found !', status: HttpStatus.BAD_REQUEST };

    const student = new StudentEntity();
    student.student_address = createStudentDto.student_address;
    student.student_avatar = createStudentDto.student_avatar;
    student.student_email = createStudentDto.student_email;
    student.student_fisrtName = createStudentDto.student_fisrtName;
    student.student_lastName = createStudentDto.student_lastName;
    student.student_mobile = createStudentDto.student_mobile;
    student.role_id = role;
    await this.studentRepository.save(student);
    return student;
  }

  async findAll() {
    const students = await this.studentRepository.find();
    return students;
  }

  async findOne(id: number) {
    const student = await this.studentRepository.findOne(id);
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const role = await this.roleSer.findOne(updateStudentDto.role_id);
    if (!role)
      return { error: 'Role is not found !', status: HttpStatus.BAD_REQUEST };

    const student = await this.studentRepository.findOne(id);
    student.student_address = updateStudentDto.student_address;
    student.student_email = updateStudentDto.student_email;
    student.student_fisrtName = updateStudentDto.student_fisrtName;
    student.student_lastName = updateStudentDto.student_lastName;
    student.student_mobile = updateStudentDto.student_mobile;
    student.role_id = role;
    if (updateStudentDto.student_avatar) {
      student.student_avatar = updateStudentDto.student_avatar;
    }
    await this.studentRepository.save(student);
    return student;
  }

  async remove(id: number) {
    try {
      const student = await this.studentRepository.findOne(id);
      await this.studentRepository.remove(student);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
