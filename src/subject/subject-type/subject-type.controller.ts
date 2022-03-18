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
import { CreateSubjectTypeDto } from './dto/create-subject-type.dto';
import { UpdateSubjectTypeDto } from './dto/update-subject-type.dto';
import { SubjectTypeService } from './subject-type.service';

@ApiTags('/api/subject-type')
@Controller('/api/subject-type')
export class SubjectTypeController {
  constructor(private readonly subjectTypeService: SubjectTypeService) {}

  @Post()
  async create(
    @Body() createSubjectTypeDto: CreateSubjectTypeDto,
    @Res() res: Response,
  ) {
    try {
      const subjectType = await this.subjectTypeService.create(
        createSubjectTypeDto,
      );
      return res.status(HttpStatus.OK).json(
        new ResponseEntity(true, 'Create subject type successfully', {
          data: subjectType,
        }),
      );
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    const subjectTypes = await this.subjectTypeService.findAll();
    return res
      .status(HttpStatus.OK)
      .json(
        new ResponseEntity(true, 'Get subject type successfully', subjectTypes),
      );
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const subjectType = await this.subjectTypeService.findOne(+id);
    return res
      .status(HttpStatus.OK)
      .json(
        new ResponseEntity(true, 'Get subject type successfully', subjectType),
      );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSubjectTypeDto: UpdateSubjectTypeDto,
    @Res() res: Response,
  ) {
    try {
      const subjectType = await this.subjectTypeService.update(
        +id,
        updateSubjectTypeDto,
      );
      return res
        .status(HttpStatus.OK)
        .json(
          new ResponseEntity(
            true,
            'Update subject type successfully',
            subjectType,
          ),
        );
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      return DeletePartternRes({ res, success: true, type: 'subject type' });
    } catch (error) {
      return DeletePartternRes({ res, success: false, type: 'subject type' });
    }
  }
}
