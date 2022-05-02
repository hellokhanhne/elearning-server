import { PartialType } from '@nestjs/swagger';
import { CreateNewsMainDto } from './create-news_main.dto';

export class UpdateNewsMainDto extends PartialType(CreateNewsMainDto) {}
