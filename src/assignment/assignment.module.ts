import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentEntity } from 'src/entity/Assignment.entity';
import { SubjectClassEntity } from 'src/entity/SubjectClass.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssignmentEntity, SubjectClassEntity])],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}
