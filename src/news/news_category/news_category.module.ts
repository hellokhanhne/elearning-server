import { Module } from '@nestjs/common';
import { NewsCategoryService } from './news_category.service';
import { NewsCategoryController } from './news_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsCategoryEntity } from 'src/entity/News_category';

@Module({
  imports: [TypeOrmModule.forFeature([NewsCategoryEntity])],
  controllers: [NewsCategoryController],
  providers: [NewsCategoryService],
})
export class NewsCategoryModule {}
