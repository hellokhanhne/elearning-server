import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClassEntity } from './Class.entity';

@Entity('faculty')
export class FacultyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  faculty_id: number;
  @Column({
    type: 'varchar',
    unique: true,
    length: '250',
  })
  faculty_name: string;
  @Column({
    type: 'varchar',
    unique: true,
    length: '100',
  })
  faculty_email: string;
  @OneToMany((type) => ClassEntity, (cl) => cl.class_faculty)
  faculty_classes: ClassEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
