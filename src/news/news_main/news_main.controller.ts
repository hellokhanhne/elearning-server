import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ApiFileImages } from 'src/decorators/api-file.decorator';
import { isFileExtensionSafe, removeFile } from 'src/utils/ImageStorage';
import {
  CreatePartterRes,
  DeletePartternRes,
  GetDataPartternRes,
  ServerError,
} from 'src/utils/ResponseParttern';
import { CreateNewsMainDto } from './dto/create-news_main.dto';
import { UpdateNewsMainDto } from './dto/update-news_main.dto';
import { NewsMainService } from './news_main.service';
import { createNewsSchema } from './schema/createNews.schema';

@UseGuards(RoleGuard())
@UseGuards(AuthGuard('at_jwt'))
@ApiBearerAuth()
@ApiTags('/api/news')
@Controller('/api/news')
export class NewsMainController {
  constructor(private readonly newsMainService: NewsMainService) {}

  @Post()
  @ApiFileImages('image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: createNewsSchema,
  })
  async create(
    @Body() createNewsMainDto: CreateNewsMainDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const fileName = file?.filename;

      if (!fileName)
        return ServerError({
          res,
          message: 'File must be a png/jpg/jpeg',
          status: HttpStatus.BAD_REQUEST,
        });
      const imagesFolderPath = join(process.cwd(), '/files/images');
      const fullImagePath = join(imagesFolderPath + '/' + file.filename);
      const isFileLegit = await isFileExtensionSafe(fullImagePath);

      if (!isFileLegit) {
        removeFile(fullImagePath);
        return ServerError({ res });
      }

      createNewsMainDto.news_image = fileName;

      const data: any = await this.newsMainService.create(createNewsMainDto);
      if (data.error) {
        return ServerError({
          res,
          message: data.message,
          status: data.status,
        });
      }
      return CreatePartterRes({ res, success: true, type: 'news', data });
    } catch (error) {}
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Res() res: Response,
  ) {
    const news = await this.newsMainService.findAll(page, limit);
    return GetDataPartternRes({ res, success: true, type: 'news', data: news });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const news = await this.newsMainService.findOne(+id);
    return GetDataPartternRes({ res, success: true, type: 'news', data: news });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNewsMainDto: UpdateNewsMainDto,
  ) {
    return this.newsMainService.update(+id, updateNewsMainDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = await this.newsMainService.remove(+id);
    if (isDeleted) {
      return DeletePartternRes({ res, success: true, type: 'news' });
    }
    return DeletePartternRes({ res, success: false, type: 'news' });
  }
}
