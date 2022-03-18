import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RequestDto } from 'src/auth/dto/request.dto';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { StudentEntity } from 'src/entity/Student.entity';
import { IErrorMsg } from 'src/utils/Error.interface';
import { ResponseEntity } from 'src/utils/ResponseEntity';
import {
  CreatePartterRes,
  DeletePartternRes,
  GetDataPartternRes,
  ServerError,
  UpdatePartternRes,
} from 'src/utils/ResponseParttern';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentService } from './student.service';

@ApiTags('/api/student')
@Controller('/api/student')
// @UseGuards(RoleGuard())
// @UseGuards(AuthGuard('at_jwt'))
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiBearerAuth()
  @Get('/me')
  async profile(@Req() req: RequestDto, @Res() res: Response) {
    const student = await this.studentService.profile(req.user.email);
    if (!student) {
      return GetDataPartternRes({ res, success: false, type: 'profile' });
    }
    return GetDataPartternRes({
      res,
      success: true,
      type: 'profile',
      data: student,
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const students = await this.studentService.findAll();
    return GetDataPartternRes({
      res,
      success: true,
      type: 'students',
      data: students,
    });
  }

  @Get('/:id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const student = await this.studentService.findOne(+id);
    return GetDataPartternRes({
      res,
      success: true,
      type: 'student',
      data: student,
    });
  }

  @Get('/class/:id')
  findByClass() {}

  @Post()
  async create(
    @Body() createStudentDto: CreateStudentDto,
    @Res() res: Response,
  ) {
    try {
      const data: any = await this.studentService.create(createStudentDto);
      if (data.error) {
        return ServerError({ res, status: data.status, message: data.error });
      }
      return CreatePartterRes({ res, success: true, type: 'student', data });
    } catch (error) {
      console.log(error.message);
      return ServerError({ res });
    }
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() createStudentDto: CreateStudentDto,
    @Res() res: Response,
  ) {
    try {
      const data: any = await this.studentService.update(+id, createStudentDto);
      if (data.error) {
        return ServerError({ res, status: data.status, message: data.error });
      }
      return UpdatePartternRes({ res, success: true, type: 'student', data });
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = await this.studentService.remove(+id);
    if (isDeleted) {
      return DeletePartternRes({ res, success: true, type: 'student' });
    }
    return DeletePartternRes({ res, success: false, type: 'student' });
  }
}
