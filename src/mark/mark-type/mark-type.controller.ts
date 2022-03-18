import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarkTypeService } from './mark-type.service';
import { CreateMarkTypeDto } from './dto/create-mark-type.dto';
import { UpdateMarkTypeDto } from './dto/update-mark-type.dto';

@Controller('mark-type')
export class MarkTypeController {
  constructor(private readonly markTypeService: MarkTypeService) {}

  @Post()
  create(@Body() createMarkTypeDto: CreateMarkTypeDto) {
    return this.markTypeService.create(createMarkTypeDto);
  }

  @Get()
  findAll() {
    return this.markTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.markTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarkTypeDto: UpdateMarkTypeDto) {
    return this.markTypeService.update(+id, updateMarkTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.markTypeService.remove(+id);
  }
}
