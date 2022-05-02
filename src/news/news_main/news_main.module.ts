import { Module } from '@nestjs/common';
import { NewsMainService } from './news_main.service';
import { NewsMainController } from './news_main.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from 'src/entity/News';
import { NewsCategoryEntity } from 'src/entity/News_category';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity, NewsCategoryEntity])],
  controllers: [NewsMainController],
  providers: [NewsMainService],
})
export class NewsMainModule {}
