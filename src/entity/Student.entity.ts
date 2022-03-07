import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './Role.entity';

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
  @OneToOne((type) => RoleEntity)
  @JoinColumn({ name: 'student_role', referencedColumnName: 'role_id' })
  role_id: RoleEntity;
}
