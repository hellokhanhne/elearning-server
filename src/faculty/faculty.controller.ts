import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import {
  CreatePartterRes,
  DeletePartternRes,
  GetDataPartternRes,
  ServerError,
  UpdatePartternRes,
} from 'src/utils/ResponseParttern';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('/api/faculty')
@Controller('/api/faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Post()
  async create(
    @Body() createFacultyDto: CreateFacultyDto,
    @Res() res: Response,
  ) {
    try {
      const faculty = await this.facultyService.create(createFacultyDto);
      return CreatePartterRes({
        res,
        type: 'faculty',
        success: true,
        data: faculty,
      });
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    const faculties = await this.facultyService.findAll();
    return GetDataPartternRes({
      res,
      type: 'faculties',
      success: true,
      data: faculties,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const faculty = await this.facultyService.findOne(+id);
    return GetDataPartternRes({
      res,
      type: 'faculty',
      success: true,
      data: faculty,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFacultyDto: UpdateFacultyDto,
    @Res() res: Response,
  ) {
    try {
      const faculty = await this.facultyService.update(+id, updateFacultyDto);
      return UpdatePartternRes({
        res,
        success: true,
        type: 'faculty',
        data: faculty,
      });
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = await this.facultyService.remove(+id);
    if (isDeleted) {
      return DeletePartternRes({ res, success: true, type: 'faculty' });
    }
    return DeletePartternRes({ res, success: false, type: 'faculty' });
  }
}
