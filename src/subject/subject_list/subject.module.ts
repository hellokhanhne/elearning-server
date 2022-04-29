import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectEntity } from 'src/entity/Subject.entity';
import { SubjectTypeEntity } from 'src/entity/SubjectType.entity';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectEntity, SubjectTypeEntity])],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
