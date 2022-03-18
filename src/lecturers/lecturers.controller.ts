import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import {
  CreatePartterRes,
  DeletePartternRes,
  GetDataPartternRes,
  ServerError,
  UpdatePartternRes,
} from 'src/utils/ResponseParttern';
import { CreateLecturerDto } from './dto/create-lecturer.dto';
import { UpdateLecturerDto } from './dto/update-lecturer.dto';
import { LecturersService } from './lecturers.service';

@ApiTags('/lecturers')
@Controller('lecturers')
export class LecturersController {
  constructor(private readonly lecturersService: LecturersService) {}

  @Post()
  async create(
    @Body() createLecturerDto: CreateLecturerDto,
    @Res() res: Response,
  ) {
    try {
      const data: any = await this.lecturersService.create(createLecturerDto);
      if (data.error) {
        return ServerError({ res, message: data.error, status: data.status });
      }
      return CreatePartterRes({ res, success: true, type: 'lecturer', data });
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    const lecturers = await this.lecturersService.findAll();
    return GetDataPartternRes({
      res,
      type: 'lecturers',
      success: true,
      data: lecturers,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const lecturer = await this.lecturersService.findOne(+id);
    return GetDataPartternRes({
      res,
      type: 'lecturer',
      success: true,
      data: lecturer,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLecturerDto: UpdateLecturerDto,
    @Res() res: Response,
  ) {
    try {
      const data: any = await this.lecturersService.update(
        +id,
        updateLecturerDto,
      );
      if (data.error) {
        return ServerError({ res, message: data.error, status: data.status });
      }
      return UpdatePartternRes({ res, success: true, type: 'lecturer', data });
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = await this.lecturersService.remove(+id);
    if (isDeleted) {
      return DeletePartternRes({ res, success: true, type: 'lecturer' });
    }
    return DeletePartternRes({ res, success: true, type: 'lecturer' });
  }
}
