import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as moment from 'moment-timezone';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  moment.tz.setDefault('Asia/Saigon');
  const config = new DocumentBuilder()
    .setTitle('Elearning')
    .setDescription('Elearning backend')
    .setVersion('1.0')
    .addTag('El_BACKEND')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 5000);
}

bootstrap();
