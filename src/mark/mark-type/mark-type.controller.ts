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
import { MarkTypeService } from './mark-type.service';
import { CreateMarkTypeDto } from './dto/create-mark-type.dto';
import { UpdateMarkTypeDto } from './dto/update-mark-type.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  CreatePartterRes,
  DeletePartternRes,
  GetDataPartternRes,
} from 'src/utils/ResponseParttern';
import { Response } from 'express';

@ApiTags('/api/mark-type')
@Controller('/api/mark-type')
export class MarkTypeController {
  constructor(private readonly markTypeService: MarkTypeService) {}

  @Post()
  async create(
    @Body() createMarkTypeDto: CreateMarkTypeDto,
    @Res() res: Response,
  ) {
    try {
      const markType = await this.markTypeService.create(createMarkTypeDto);
      return CreatePartterRes({
        res,
        success: true,
        type: 'mark type',
        data: markType,
      });
    } catch (error) {
      return CreatePartterRes({ res, success: false, type: 'mark type' });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    const markTypes = await this.markTypeService.findAll();
    return GetDataPartternRes({
      res,
      success: true,
      type: 'mark type',
      data: markTypes,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const markType = await this.markTypeService.findOne(+id);
    return GetDataPartternRes({
      res,
      success: true,
      type: 'mark type',
      data: markType,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMarkTypeDto: UpdateMarkTypeDto,
  ) {
    return this.markTypeService.update(+id, updateMarkTypeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = await this.markTypeService.remove(+id);
    if (isDeleted) {
      return DeletePartternRes({ res, success: true, type: 'mark type' });
    }
    return DeletePartternRes({ res, success: false, type: 'mark type' });
  }
}
