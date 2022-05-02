import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudentEntity } from './Student.entity';
import { TimeTableEntity } from './Timetable.entity';

@Entity('attendance')
export class AttendanceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  attendance_id: number;
  @Column()
  attendance_desc: string;
  @Column({ default: false })
  attendance_check: boolean;
  @Column()
  attendance_date: Date;
  @OneToMany((type) => StudentEntity, (s) => s.student_attendance)
  attendance_students_absent: StudentEntity[];
  @OneToOne((type) => TimeTableEntity, (t) => t.attendance)
  @JoinColumn({ name: 'timetable_id' })
  timetable: TimeTableEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
