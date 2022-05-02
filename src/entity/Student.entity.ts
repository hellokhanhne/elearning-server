import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AttendanceEntity } from '../entity/Attendance';
import { ClassEntity } from './Class.entity';
import { MarkDetailsEntity } from './Mark_details.entity';
import { RoleEntity } from './Role.entity';
import { SubjectClassEntity } from './SubjectClass.entity';

@Entity('students')
export class StudentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  student_id: number;
  @Column({
    type: 'varchar',
  })
  student_email: string;
  @Column({
    type: 'varchar',
    length: 10,
  })
  student_mobile: string;
  @Column({
    type: 'varchar',
    length: 50,
  })
  student_fisrtName: string;
  @Column({
    type: 'varchar',
    length: 50,
  })
  student_lastName: string;

  @Column({
    type: 'varchar',
  })
  student_address: string;
  @Column({
    type: 'varchar',
  })
  student_avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => ClassEntity, (cl) => cl.class_students)
  @JoinColumn({ name: 'class_id' })
  student_class: ClassEntity;
  @ManyToOne((type) => RoleEntity)
  @JoinColumn({ name: 'student_role' })
  role_id: RoleEntity;

  @ManyToMany((type) => SubjectClassEntity, (std) => std.subject_class_students)
  student_subject_classes: SubjectClassEntity[];

  @OneToMany((type) => MarkDetailsEntity, (mk) => mk.student)
  student_marks: MarkDetailsEntity[];

  @ManyToOne((type) => AttendanceEntity, (a) => a.attendance_students_absent)
  student_attendance: AttendanceEntity;
}
