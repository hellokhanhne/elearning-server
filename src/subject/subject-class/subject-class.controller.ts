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
import { SubjectClassService } from './subject-class.service';
import { CreateSubjectClassDto } from './dto/create-subject-class.dto';
import { UpdateSubjectClassDto } from './dto/update-subject-class.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  CreatePartterRes,
  DeletePartternRes,
  GetDataPartternRes,
  ServerError,
  UpdatePartternRes,
} from 'src/utils/ResponseParttern';
import { Response } from 'express';
import { IErrorMsg } from 'src/utils/Error.interface';

@ApiTags('/api/subject-class')
@Controller('/api/subject-class')
export class SubjectClassController {
  constructor(private readonly subjectClassService: SubjectClassService) {}

  @Post()
  async create(
    @Body() createSubjectClassDto: CreateSubjectClassDto,
    @Res() res: Response,
  ) {
    try {
      const subjectClass = await this.subjectClassService.create(
        createSubjectClassDto,
      );
      return CreatePartterRes({
        res,
        type: 'subject class',
        success: true,
        data: subjectClass,
      });
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const subjectClasses = await this.subjectClassService.findAll();
      return GetDataPartternRes({
        res,
        success: true,
        type: 'subject classes',
        data: subjectClasses,
      });
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const subjectClass = await this.subjectClassService.findOne(+id);
      return GetDataPartternRes({
        res,
        success: true,
        type: 'subject class',
        data: subjectClass,
      });
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSubjectClassDto: UpdateSubjectClassDto,
    @Res() res: Response,
  ) {
    try {
      const data: IErrorMsg = await this.subjectClassService.update(
        +id,
        updateSubjectClassDto,
      );
      if (data.error) {
        return ServerError({
          res,
          message: data.error,
          status: data.status,
        });
      }
      return UpdatePartternRes({ res, success: true, type: 'subject class ' });
    } catch (error) {
      return UpdatePartternRes({ res, success: false, type: 'subject class ' });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = await this.subjectClassService.remove(+id);
    if (!isDeleted) {
      return DeletePartternRes({ res, success: false, type: 'subject class' });
    }
    return DeletePartternRes({ res, success: false, type: 'subject class' });
  }
}
