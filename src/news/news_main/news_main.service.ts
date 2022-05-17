import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from 'src/entity/News';
import { NewsCategoryEntity } from 'src/entity/News_category';
import { Repository } from 'typeorm';
import { CreateNewsMainDto } from './dto/create-news_main.dto';
import { UpdateNewsMainDto } from './dto/update-news_main.dto';

@Injectable()
export class NewsMainService {
  constructor(
    @InjectRepository(NewsEntity) private newsRep: Repository<NewsEntity>,
    @InjectRepository(NewsCategoryEntity)
    private newsCateRep: Repository<NewsCategoryEntity>,
  ) {}
  async create(createNewsMainDto: CreateNewsMainDto) {
    try {
      const newsCate = await this.newsCateRep.findOne(
        createNewsMainDto.news_category_id,
      );
      if (!newsCate) {
        return {
          error: "Can't find news category !",
          status: HttpStatus.BAD_REQUEST,
        };
      }
      const news = new NewsEntity();
      news.news_title = createNewsMainDto.news_title;
      news.news_desc = createNewsMainDto.news_desc;
      news.news_image = createNewsMainDto.news_image;
      news.news_content = createNewsMainDto.news_content;
      news.news_category = newsCate;
      await this.newsRep.save(news);
      return news;
    } catch (error) {}
  }

  async findAll() {
    const news = await this.newsRep.find({ relations: ['news_category'] });
    return news;
  }

  async findOne(id: number) {
    const news = await this.newsRep.findOne(id);
    return news;
  }

  update(id: number, updateNewsMainDto: UpdateNewsMainDto) {
    return `This action updates a #${id} newsMain`;
  }

  async remove(id: number) {
    try {
      const news = await this.newsRep.findOne(id);
      await this.newsRep.remove(news);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
