import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DealineDone } from './DealineDone';
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
  @Column()
  content: string;
  @ManyToOne((t) => SubjectClassEntity, (s) => s.assignments)
  subject_class: SubjectClassEntity;

  @OneToMany(() => DealineDone, (a) => a.assigment)
  deadlines: DealineDone[];

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
