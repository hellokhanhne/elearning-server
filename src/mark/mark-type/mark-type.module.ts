import { Module } from '@nestjs/common';
import { MarkTypeService } from './mark-type.service';
import { MarkTypeController } from './mark-type.controller';

@Module({
  controllers: [MarkTypeController],
  providers: [MarkTypeService]
})
export class MarkTypeModule {}
