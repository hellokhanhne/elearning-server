import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LecturersEntity } from 'src/entity/Lecturers.entity';
import { LevelService } from 'src/level/level.service';
import { RoleService } from 'src/role/role.service';
import { IErrorMsg } from 'src/utils/Error.interface';
import { Repository } from 'typeorm';
import { CreateLecturerDto } from './dto/create-lecturer.dto';
import { UpdateLecturerDto } from './dto/update-lecturer.dto';

@Injectable()
export class LecturersService {
  constructor(
    @InjectRepository(LecturersEntity)
    private lecRep: Repository<LecturersEntity>,
    private levelSer: LevelService,
    private roleSer: RoleService,
  ) {}
  async create(
    createLecturerDto: CreateLecturerDto,
  ): Promise<LecturersEntity | IErrorMsg> {
    try {
      const level = await this.levelSer.findOne(
        createLecturerDto.leturer_level,
      );
      if (!level)
        return {
          error: 'Level is not found !',
          status: HttpStatus.BAD_REQUEST,
        };
      const role = await this.roleSer.findOne(createLecturerDto.role_id);
      if (!role)
        return { error: 'Role is not found !', status: HttpStatus.BAD_REQUEST };
      const lecturers = new LecturersEntity();

      lecturers.leturer_firstName = createLecturerDto.leturer_firstName;
      lecturers.leturer_lastName = createLecturerDto.leturer_lastName;
      lecturers.leturer_avatar = createLecturerDto.leturer_avatar;
      lecturers.leturer_birthday = createLecturerDto.leturer_birthday;
      lecturers.leturer_email = createLecturerDto.leturer_email;
      lecturers.leturer_phone = createLecturerDto.leturer_phone;
      lecturers.leturer_website = createLecturerDto.leturer_website;
      lecturers.leturer_level = level;
      lecturers.role_id = role;

      await this.lecRep.save(lecturers);
      return lecturers;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<LecturersEntity[]> {
    const lecturers = await this.lecRep.find({ relations: ['role_id'] });
    return lecturers;
  }

  async findOne(id: number): Promise<LecturersEntity> {
    const lecturer = await this.lecRep.findOne(id);
    return lecturer;
  }

  async profile(leturer_email: string | any) {
    const user = await this.lecRep.findOne(
      { leturer_email },
      { relations: ['role_id'] },
    );
    return user;
  }

  async update(
    id: number,
    updateLecturerDto: UpdateLecturerDto,
  ): Promise<LecturersEntity | IErrorMsg> {
    try {
      const level = await this.levelSer.findOne(
        updateLecturerDto.leturer_level,
      );
      if (!level)
        return {
          error: 'Level is not found !',
          status: HttpStatus.BAD_REQUEST,
        };

      const role = await this.roleSer.findOne(updateLecturerDto.role_id);
      if (!role)
        return { error: 'Role is not found !', status: HttpStatus.BAD_REQUEST };

      const lecturers = await this.lecRep.findOne(id);

      if (updateLecturerDto.leturer_avatar) {
        lecturers.leturer_avatar = updateLecturerDto.leturer_avatar;
      }

      lecturers.leturer_firstName = updateLecturerDto.leturer_firstName;
      lecturers.leturer_lastName = updateLecturerDto.leturer_lastName;
      lecturers.leturer_avatar = updateLecturerDto.leturer_avatar;
      lecturers.leturer_birthday = updateLecturerDto.leturer_birthday;
      lecturers.leturer_email = updateLecturerDto.leturer_email;
      lecturers.leturer_phone = updateLecturerDto.leturer_phone;
      lecturers.leturer_website = updateLecturerDto.leturer_website;
      lecturers.leturer_level = level;
      lecturers.role_id = role;

      await this.lecRep.save(lecturers);
      return lecturers;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number): Promise<Boolean> {
    const lecturer = await this.lecRep.findOne(id);
    if (!lecturer) return false;
    await this.lecRep.remove(lecturer);
    return false;
  }
}
