import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';
import { TimetableService } from './timetable.service';

@ApiTags('/api/timetable')
@Controller('/api/timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Post()
  async create(
    @Body() createTimetableDto: CreateTimetableDto,
    @Res() res: Response,
  ) {
    try {
      const data: any = await this.timetableService.create(createTimetableDto);
      if (data.error) {
        return ServerError({
          res,
          message: data.error,
          status: data.status,
        });
      }
      return CreatePartterRes({ res, type: 'timetable', success: true, data });
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    const timetables = await this.timetableService.findAll();
    return GetDataPartternRes({
      res,
      success: true,
      type: 'timetables',
      data: timetables,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const timetable = await this.timetableService.findOne(+id);
    return GetDataPartternRes({
      res,
      success: true,
      type: 'timetable',
      data: timetable,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTimetableDto: UpdateTimetableDto,
    @Res() res: Response,
  ) {
    try {
      const data: any = await this.timetableService.update(
        +id,
        updateTimetableDto,
      );
      if (data.error) {
        return ServerError({
          res,
          message: data.error,
          status: data.status,
        });
      }
      return UpdatePartternRes({ res, type: 'timetable', success: true, data });
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = await this.timetableService.remove(+id);
    if (!isDeleted) {
      return DeletePartternRes({ res, success: false, type: 'timetable' });
    }
    return DeletePartternRes({ res, success: true, type: 'timetable' });
  }
}
