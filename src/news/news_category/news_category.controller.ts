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
import { NewsCategoryService } from './news_category.service';
import { CreateNewsCategoryDto } from './dto/create-news_category.dto';
import { UpdateNewsCategoryDto } from './dto/update-news_category.dto';
import {
  CreatePartterRes,
  GetDataPartternRes,
} from 'src/utils/ResponseParttern';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('/api/news-category')
@Controller('/api/news-category')
export class NewsCategoryController {
  constructor(private readonly newsCategoryService: NewsCategoryService) {}

  @Post()
  async create(
    @Body() createNewsCategoryDto: CreateNewsCategoryDto,
    @Res() res: Response,
  ) {
    try {
      const newsCategory = await this.newsCategoryService.create(
        createNewsCategoryDto,
      );
      return CreatePartterRes({
        res,
        success: true,
        type: 'news_category',
        data: newsCategory,
      });
    } catch (error) {
      return CreatePartterRes({ res, success: false, type: 'news_category' });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    const newsCategories = await this.newsCategoryService.findAll();
    return GetDataPartternRes({
      res,
      success: true,
      type: 'news_category',
      data: newsCategories,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNewsCategoryDto: UpdateNewsCategoryDto,
  ) {
    return this.newsCategoryService.update(+id, updateNewsCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsCategoryService.remove(+id);
  }
}
