import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarkWeightService } from './mark-weight.service';
import { CreateMarkWeightDto } from './dto/create-mark-weight.dto';
import { UpdateMarkWeightDto } from './dto/update-mark-weight.dto';

@Controller('mark-weight')
export class MarkWeightController {
  constructor(private readonly markWeightService: MarkWeightService) {}

  @Post()
  create(@Body() createMarkWeightDto: CreateMarkWeightDto) {
    return this.markWeightService.create(createMarkWeightDto);
  }

  @Get()
  findAll() {
    return this.markWeightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.markWeightService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarkWeightDto: UpdateMarkWeightDto) {
    return this.markWeightService.update(+id, updateMarkWeightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.markWeightService.remove(+id);
  }
}
