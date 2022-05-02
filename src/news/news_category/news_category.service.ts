import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsCategoryEntity } from 'src/entity/News_category';
import { Repository } from 'typeorm';
import { CreateNewsCategoryDto } from './dto/create-news_category.dto';
import { UpdateNewsCategoryDto } from './dto/update-news_category.dto';

@Injectable()
export class NewsCategoryService {
  constructor(
    @InjectRepository(NewsCategoryEntity)
    private newsCateRep: Repository<NewsCategoryEntity>,
  ) {}
  async create(createNewsCategoryDto: CreateNewsCategoryDto) {
    try {
      const newsCategory = new NewsCategoryEntity();
      newsCategory.news_category_name =
        createNewsCategoryDto.news_category_name;
      newsCategory.news_category_desc =
        createNewsCategoryDto.news_category_desc;
      await this.newsCateRep.save(newsCategory);
      return newsCategory;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    const newsCategorys = await this.newsCateRep.find();
    return newsCategorys;
  }

  findOne(id: number) {
    return `This action returns a #${id} newsCategory`;
  }

  update(id: number, updateNewsCategoryDto: UpdateNewsCategoryDto) {
    return `This action updates a #${id} newsCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} newsCategory`;
  }
}
