import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MarkDetailsService } from './mark-details.service';
import { CreateMarkDetailDto } from './dto/create-mark-detail.dto';
import { UpdateMarkDetailDto } from './dto/update-mark-detail.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('/api/mark-details')
@Controller('/api/mark-details')
export class MarkDetailsController {
  constructor(private readonly markDetailsService: MarkDetailsService) {}

  @Post()
  create(@Body() createMarkDetailDto: CreateMarkDetailDto) {
    return this.markDetailsService.create(createMarkDetailDto);
  }

  @Get()
  findAll() {
    return this.markDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.markDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMarkDetailDto: UpdateMarkDetailDto,
  ) {
    return this.markDetailsService.update(+id, updateMarkDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.markDetailsService.remove(+id);
  }
}
