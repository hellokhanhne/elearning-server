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
  UploadedFile,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';
import { ApiFileImages } from 'src/decorators/api-file.decorator';
import { isFileExtensionSafe, removeFile } from 'src/utils/ImageStorage';
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
  @ApiFileImages('image')
  @ApiOperation({
    description: 'Use postman to send with file, property : image',
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
    @Body()
    createSubjectDto: CreateSubjectDto,
  ) {
    try {
      const fileName = file?.filename;

      if (fileName) {
        const imagesFolderPath = join(process.cwd(), '/files/images');
        const fullImagePath = join(imagesFolderPath + '/' + file.filename);
        const isFileLegit = isFileExtensionSafe(fullImagePath);
        if (!isFileLegit) {
          removeFile(fullImagePath);
          return ServerError({ res });
        }
        createSubjectDto.subject_img = file.filename;
      }
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
  @ApiFileImages('image')
  @ApiOperation({
    description: 'Use postman to send with file, property : file',
  })
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
    @Res() res: Response,
  ) {
    try {
      const fileName = file?.filename;

      if (fileName) {
        const imagesFolderPath = join(process.cwd(), '/files/images');
        const fullImagePath = join(imagesFolderPath + '/' + file.filename);
        const isFileLegit = isFileExtensionSafe(fullImagePath);
        if (!isFileLegit) {
          removeFile(fullImagePath);
          return ServerError({ res });
        }
        updateSubjectDto.subject_img = file.filename;
      }
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
