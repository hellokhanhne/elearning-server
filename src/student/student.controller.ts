import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';
import { RequestDto } from 'src/auth/dto/request.dto';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ApiFileImages } from 'src/decorators/api-file.decorator';
import { isFileExtensionSafe, removeFile } from 'src/utils/ImageStorage';
import {
  CreatePartterRes,
  DeletePartternRes,
  GetDataPartternRes,
  ServerError,
  UpdatePartternRes,
} from 'src/utils/ResponseParttern';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentService } from './student.service';

@ApiTags('/api/student')
@Controller('/api/student')
@UseGuards(RoleGuard())
@UseGuards(AuthGuard('at_jwt'))
@ApiBearerAuth()
// @UseGuards(RoleGuard())
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

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

  @Get('/subject-class')
  async studentSubjectClass(@Req() req: RequestDto, @Res() res: Response) {
    const student = await this.studentService.studentSubjectClass(req.user.id);
    return GetDataPartternRes({
      res,
      success: true,
      type: 'student',
      data: student,
    });
  }

  @Get('/timetable')
  @ApiOperation({
    description: 'Get all timetable of student',
  })
  async studentTimetable(@Req() req: RequestDto, @Res() res: Response) {
    const data = await this.studentService.studentTimetable(req.user.id);
    return GetDataPartternRes({
      res,
      success: true,
      type: 'student timetables',
      data: data,
    });
  }

  @ApiOperation({
    description: 'Get now timetable of student',
  })
  @Get('/timetable/now')
  async studentTimetableNow(@Req() req: RequestDto, @Res() res: Response) {
    const data = await this.studentService.studentTimetableNow(req.user.id);
    return GetDataPartternRes({
      res,
      success: true,
      type: 'student timetable',
      data: data,
    });
  }

  @ApiOperation({
    description: 'Get now timetable of student',
  })
  @Get('/timetable/bydate')
  async studentTimetableByDate(
    @Req() req: RequestDto,
    @Query('start') start: string,
    @Query('end') end: string,

    @Res() res: Response,
  ) {
    console.log(start, end);
    const data = await this.studentService.getTimetableByDate(
      req.user.id,
      start,
      end,
    );
    return GetDataPartternRes({
      res,
      success: true,
      type: 'student timetable',
      data: data,
    });
  }

  @Get('/deadline')
  async studentDealine(@Res() res: Response, @Req() req: RequestDto) {
    const deadlines = await this.studentService.studentDealine(req.user.id);
    return GetDataPartternRes({
      res,
      success: true,
      type: 'deadline',
      data: deadlines,
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

  // @Get('/class/:id')
  // findByClass() {}

  @Post()
  @ApiFileImages('avatar')
  @ApiOperation({
    description: 'Use postman to send with file, property : file',
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createStudentDto: CreateStudentDto,
    @Res() res: Response,
  ) {
    try {
      const fileName = file?.filename;

      if (!fileName)
        return ServerError({
          res,
          message: 'File must be a png/jpg/jpeg',
          status: HttpStatus.BAD_REQUEST,
        });
      const imagesFolderPath = join(process.cwd(), '/files/images');
      const fullImagePath = join(imagesFolderPath + '/' + file.filename);
      const isFileLegit = await isFileExtensionSafe(fullImagePath);

      if (!isFileLegit) {
        removeFile(fullImagePath);
        return ServerError({ res });
      }
      createStudentDto.student_avatar = file.filename;

      const data: any = await this.studentService.create(createStudentDto);
      if (data.error) {
        return ServerError({ res, status: data.status, message: data.error });
      }
      return CreatePartterRes({ res, success: true, type: 'student', data });
    } catch (error) {
      console.log(error);
      return ServerError({ res });
    }
  }

  @Put('/:id')
  @ApiFileImages('avatar')
  @ApiOperation({
    description: 'Use postman to send with file, property : file',
  })
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
    @Res() res: Response,
  ) {
    try {
      const fileName = file?.filename;

      if (fileName) {
        const imagesFolderPath = join(process.cwd(), 'images');
        const fullImagePath = join(imagesFolderPath + '/' + file.filename);
        const isFileLegit = isFileExtensionSafe(fullImagePath);
        if (!isFileLegit) {
          removeFile(fullImagePath);
          return ServerError({ res });
        }
        updateStudentDto.student_avatar = file.filename;
      }
      const data: any = await this.studentService.update(+id, updateStudentDto);
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
