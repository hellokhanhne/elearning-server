import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateNewsMainDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  news_title: string;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  news_desc: string;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  news_content: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  news_category_id: number;
  news_image: string;
}
