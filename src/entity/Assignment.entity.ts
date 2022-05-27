import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubjectClassEntity } from './SubjectClass.entity';

@Entity('assignment')
export class AssignmentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  assigment_id: number;
  @Column()
  desc: string;
  @Column()
  deadline: Date;
  @Column()
  attachment: string;

  @ManyToOne((t) => SubjectClassEntity, (s) => s.assignments)
  subject_class: SubjectClassEntity;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
