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

  async findAll(page: number = 1, limit: number = 5) {
    const skip = (page - 1) * limit;
    const data = await this.newsRep.findAndCount({
      relations: ['news_category'],
      take: limit,
      skip,
    });
    // for (let n of news) {
    //   n.news_content = n.news_content.replace(
    //     'http://localhost:5000',
    //     'https://nguyenngockhanh.xyz',
    //   );
    //   await n.save();
    // }
    return {
      news: data[0],

      total: data[1],
    };
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
