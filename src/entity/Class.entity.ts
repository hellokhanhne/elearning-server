import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FacultyEntity } from './Faculty.entity';
import { StudentEntity } from './Student.entity';

@Entity('class_list')
export class ClassEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  class_id: number;
  @Column({
    type: 'varchar',
    length: 50,
  })
  class_name: string;
  @ManyToOne((type) => FacultyEntity, (f) => f.faculty_classes)
  @JoinColumn({ name: 'faculty_id' })
  class_faculty: FacultyEntity;
  @OneToMany((type) => StudentEntity, (std) => std.student_class)
  class_students: StudentEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
