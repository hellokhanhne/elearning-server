import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubjectClassEntity } from './SubjectClass.entity';

@Entity('timetable')
export class TimeTableEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  timetable_id: number;
  @Column({
    type: 'numeric',
  })
  day_of_week: number;
  @Column({
    type: 'varchar',
  })
  lession: string;
  @Column({
    type: 'varchar',
    length: 50,
  })
  classroom: string;

  @ManyToOne((type) => SubjectClassEntity, (std) => std.subject_class_timetable)
  @JoinColumn({ name: 'classroom_subject_id' })
  classroom_subject_classes: SubjectClassEntity[];
}
