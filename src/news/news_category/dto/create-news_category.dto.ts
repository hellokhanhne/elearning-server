import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNewsCategoryDto {
  @IsNotEmpty()
  @ApiProperty()
  news_category_name: string;
  @IsNotEmpty()
  @ApiProperty()
  news_category_desc: string;
}
