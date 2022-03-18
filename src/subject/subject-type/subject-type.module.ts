import { Module } from '@nestjs/common';
import { SubjectTypeService } from './subject-type.service';
import { SubjectTypeController } from './subject-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectTypeEntity } from 'src/entity/SubjectType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectTypeEntity])],
  controllers: [SubjectTypeController],
  providers: [SubjectTypeService],
})
export class SubjectTypeModule {}
