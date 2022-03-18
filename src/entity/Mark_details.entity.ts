import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MarkWeightEntity } from './Mark_weight.entity';
import { StudentEntity } from './Student.entity';

@Entity('mark_details')
export class MarkDetailsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  mark_details_id: number;
  @Column({
    type: 'float',
  })
  mark_number: number;

  @ManyToOne((type) => StudentEntity, (std) => std.student_marks)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @ManyToOne((type) => MarkWeightEntity)
  @JoinColumn({ name: 'mark_weight_id' })
  mark_weight: MarkWeightEntity;
}
