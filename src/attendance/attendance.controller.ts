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
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { IErrorMsg } from 'src/utils/Error.interface';
import { CreatePartterRes, ServerError } from 'src/utils/ResponseParttern';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@ApiTags('/api/attendance')
@Controller('/api/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  async create(
    @Body() createAttendanceDto: CreateAttendanceDto,
    @Res() res: Response,
  ) {
    try {
      const data: any = await this.attendanceService.create(
        createAttendanceDto,
      );
      if (data.error) {
        return ServerError({ res, message: data.error, status: data.status });
      }
      return CreatePartterRes({ res, success: true, type: 'attendance', data });
    } catch (error) {}
  }

  @Get()
  async findAll() {
    return await this.attendanceService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.attendanceService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateAttendanceDto: UpdateAttendanceDto,
  // ) {
  //   return this.attendanceService.update(+id, updateAttendanceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.attendanceService.remove(+id);
  // }
}
