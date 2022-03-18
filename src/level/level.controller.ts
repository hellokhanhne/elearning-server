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
import { DeletePartternRes } from 'src/utils/ResponseParttern';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { LevelService } from './level.service';

@ApiTags('/level')
@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post()
  async create(@Body() createLevelDto: CreateLevelDto, @Res() res: Response) {
    try {
      const level = await this.levelService.create(createLevelDto);
      return res.status(HttpStatus.OK).json(
        new ResponseEntity(true, 'Create level successfully !', {
          data: level,
        }),
      );
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ResponseEntity(false, 'Create level failed !'));
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    const levels = await this.levelService.findAll();
    return res
      .status(HttpStatus.OK)
      .json(
        new ResponseEntity(true, 'Get levels successfully !', { data: levels }),
      );
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const level = await this.levelService.findOne(+id);
    return res
      .status(HttpStatus.OK)
      .json(
        new ResponseEntity(true, 'Get level successfully !', { data: level }),
      );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLevelDto: UpdateLevelDto,
    @Res() res: Response,
  ) {
    try {
      const level = await this.levelService.update(+id, updateLevelDto);
      return res.status(HttpStatus.OK).json(
        new ResponseEntity(true, 'Update level successfully !', {
          data: level,
        }),
      );
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ResponseEntity(false, 'Update level failed !'));
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = await this.levelService.remove(+id);
    if (isDeleted) {
      return DeletePartternRes({ res, success: true, type: 'level' });
    }
    return DeletePartternRes({ res, success: false, type: 'level' });
  }
}
