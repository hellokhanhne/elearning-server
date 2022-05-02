import {
  Controller,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';
import { ApiFileImages } from 'src/decorators/api-file.decorator';
import { isFileExtensionSafe, removeFile } from 'src/utils/ImageStorage';
import { ResponseEntity } from 'src/utils/ResponseEntity';
import { ServerError } from 'src/utils/ResponseParttern';

@ApiTags('/api/upload')
@Controller('/api/upload')
export class UploadController {
  @Post()
  @ApiFileImages('file')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const fileName = file?.filename;

    if (!fileName)
      return ServerError({
        res,
        message: 'File must be a png/jpg/jpeg',
        status: HttpStatus.BAD_REQUEST,
      });
    const imagesFolderPath = join(process.cwd(), '/files/images');
    const fullImagePath = join(imagesFolderPath + '/' + file.filename);
    const isFileLegit = isFileExtensionSafe(fullImagePath);
    if (!isFileLegit) {
      removeFile(fullImagePath);
      return ServerError({ res });
    }
    return res
      .status(HttpStatus.CREATED)
      .json(new ResponseEntity(true, 'Upload file successfully !', file));
  }
}
