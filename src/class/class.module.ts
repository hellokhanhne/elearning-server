import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from 'src/entity/Class.entity';
import { FacultyEntity } from 'src/entity/Faculty.entity';
import { FacultyService } from 'src/faculty/faculty.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClassEntity, FacultyEntity])],
  controllers: [ClassController],
  providers: [ClassService, FacultyService],
})
export class ClassModule {}
