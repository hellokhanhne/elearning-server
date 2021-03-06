import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { AssignmentEntity } from './Assignment.entity';
import { LecturersEntity } from './Lecturers.entity';
import { MarkWeightEntity } from './Mark_weight.entity';
import { StudentEntity } from './Student.entity';
import { SubjectEntity } from './Subject.entity';
import { TimeTableEntity } from './Timetable.entity';

@Entity('subject_class')
export class SubjectClassEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  subject_class_id: number;
  @Column({
    length: 100,
    type: 'varchar',
  })
  subject_class_name: string;
  @Column({
    length: 50,
    type: 'varchar',
  })
  subject_class_short_name: string;
  @Column({
    length: 50,
    type: 'varchar',
  })
  school_year: string;
  @Column({
    type: 'numeric',
  })
  semester: number;
  @Column({
    type: 'date',
  })
  date_start: Date;
  @Column({
    type: 'date',
  })
  date_end: Date;

  @ManyToMany((type) => StudentEntity, (sc) => sc.student_subject_classes)
  @JoinTable({
    name: 'subject_class_student',
    joinColumn: { name: 'subject_class_id' },
    inverseJoinColumn: { name: 'student_id' },
  })
  subject_class_students: StudentEntity[];

  @ManyToOne((type) => LecturersEntity, (lt) => lt.lecturers_classes)
  @JoinColumn({ name: 'leturer_id' })
  subject_class_leturer: LecturersEntity;

  @OneToMany((type) => TimeTableEntity, (tb) => tb.classroom_subject_class)
  subject_class_timetable: TimeTableEntity[];

  @OneToMany((type) => MarkWeightEntity, (mk) => mk.subject_class)
  mark_weight: MarkWeightEntity[];

  @ManyToOne((type) => SubjectEntity, (sb) => sb.subject_classes)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @OneToMany(() => AssignmentEntity, (a) => a.subject_class)
  assignments: AssignmentEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
