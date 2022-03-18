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
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@ApiTags('/api/class')
@Controller('/api/class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  async create(@Body() createClassDto: CreateClassDto, @Res() res: Response) {
    try {
      const data: any = await this.classService.create(createClassDto);
      if (data.error) {
        return ServerError({ res, message: data.error, status: data.status });
      }
      return CreatePartterRes({ res, type: 'class', success: true, data });
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    const classes = await this.classService.findAll();
    return GetDataPartternRes({
      res,
      type: 'classes',
      data: classes,
      success: true,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const _class = await this.classService.findOne(+id);
    return GetDataPartternRes({
      res,
      type: 'class',
      data: _class,
      success: true,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClassDto: UpdateClassDto,
    @Res() res: Response,
  ) {
    try {
      const data: any = await this.classService.update(+id, updateClassDto);
      if (data.error) {
        return ServerError({ res, message: data.error, status: data.status });
      }
      return UpdatePartternRes({ res, type: 'class', success: true, data });
    } catch (error) {
      return ServerError({ res });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = await this.classService.remove(+id);
    if (isDeleted) {
      return DeletePartternRes({ res, success: true, type: 'class' });
    }
    return DeletePartternRes({ res, success: false, type: 'class' });
  }
}
