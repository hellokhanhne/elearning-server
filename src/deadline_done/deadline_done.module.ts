import { Module } from '@nestjs/common';
import { DeadlineDoneService } from './deadline_done.service';
import { DeadlineDoneController } from './deadline_done.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from 'src/entity/Student.entity';
import { DealineDone } from 'src/entity/DealineDone';
import { AssignmentEntity } from 'src/entity/Assignment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentEntity, DealineDone, AssignmentEntity]),
  ],

  controllers: [DeadlineDoneController],
  providers: [DeadlineDoneService],
})
export class DeadlineDoneModule {}
