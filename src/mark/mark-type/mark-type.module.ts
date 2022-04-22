import { Module } from '@nestjs/common';
import { MarkTypeService } from './mark-type.service';
import { MarkTypeController } from './mark-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarkTypeEntity } from 'src/entity/Mark_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarkTypeEntity])],
  controllers: [MarkTypeController],
  providers: [MarkTypeService],
})
export class MarkTypeModule {}
