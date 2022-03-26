import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { saveImageToStorage } from 'src/utils/ImageStorage';

export function ApiFileImages(name: string) {
  return applyDecorators(
    UseInterceptors(FileInterceptor(name, saveImageToStorage)),
    ApiConsumes('multipart/form-data'),
  );
}
