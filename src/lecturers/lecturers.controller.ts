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

@ApiTags('/api/lecturers')
@Controller('/api/lecturers')
export class LecturersController {
  constructor(private readonly lecturersService: LecturersService) {}

  @Post()
  @ApiFileImages('avatar')
  @ApiOperation({
    description: 'Use postman to send with file, property : file',
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createLecturerDto: CreateLecturerDto,
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
      const isFileLegit = isFileExtensionSafe(fullImagePath);
      if (!isFileLegit) {
        removeFile(fullImagePath);
        return ServerError({ res });
      }
      createLecturerDto.leturer_avatar = file.filename;
      const data: any = await this.lecturersService.create(createLecturerDto);
      if (data.error) {
        return ServerError({ res, message: data.error, status: data.status });
      }
      return CreatePartterRes({ res, success: true, type: 'lecturer', data });
      // console.log(createLecturerDto);
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
  @ApiFileImages('avatar')
  @ApiOperation({
    description: 'Use postman to send with file, property : file',
  })
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateLecturerDto: UpdateLecturerDto,
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
        updateLecturerDto.leturer_avatar = file.filename;
      }
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
