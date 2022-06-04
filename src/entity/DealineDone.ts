import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AssignmentEntity } from './Assignment.entity';
import { StudentEntity } from './Student.entity';

@Entity('dealine_done')
export class DealineDone extends BaseEntity {
  @PrimaryGeneratedColumn()
  deadline_id: number;

  @Column()
  attachment: string;

  @ManyToOne((type) => AssignmentEntity, (d) => d.deadlines, {
    onDelete: 'CASCADE',
  })
  assigment: AssignmentEntity;

  @ManyToOne(() => StudentEntity, (d) => d.dealines)
  student: StudentEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
