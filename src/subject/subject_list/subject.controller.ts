import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ResponseEntity } from 'src/utils/ResponseEntity';
import { DeletePartternRes, ServerError } from 'src/utils/ResponseParttern';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectService } from './subject.service';

@ApiTags('/api/subject')
@Controller('/api/subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  async create(
    @Body() createSubjectDto: CreateSubjectDto,
    @Res() res: Response,
  ) {
    try {
      const subject = await this.subjectService.create(createSubjectDto);
      return res.status(HttpStatus.OK).json(
        new ResponseEntity(true, 'Create subject successfully', {
          data: subject,
        }),
      );
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    const subjects = await this.subjectService.findAll();
    return res.status(HttpStatus.OK).json(
      new ResponseEntity(true, 'Get subjects successfully', {
        data: subjects,
      }),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const subject = await this.subjectService.findOne(+id);
    return res.status(HttpStatus.OK).json(
      new ResponseEntity(true, 'Get subject successfully', {
        data: subject,
      }),
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
    @Res() res: Response,
  ) {
    try {
      const subject = await this.subjectService.update(+id, updateSubjectDto);
      return res.status(HttpStatus.OK).json(
        new ResponseEntity(true, 'Update subject successfully', {
          data: subject,
        }),
      );
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = await this.subjectService.remove(+id);
    if (isDeleted) {
      return DeletePartternRes({ res, success: true, type: 'subject' });
    }
    return DeletePartternRes({ res, success: false, type: 'subject' });
  }
}
