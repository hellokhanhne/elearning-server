import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MarkTypeEntity } from './Mark_type.entity';
import { SubjectClassEntity } from './SubjectClass.entity';

@Entity('mark_weight')
export class MarkWeightEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  mark_weight_id: number;
  @Column({
    type: 'float',
  })
  mark_weight: number;

  @ManyToOne((type) => MarkTypeEntity)
  @JoinColumn({ name: 'mark_type_id' })
  mark_type: MarkTypeEntity;

  @ManyToOne((type) => SubjectClassEntity)
  @JoinColumn({ name: 'subject_class_id' })
  subject_class: SubjectClassEntity;
}
