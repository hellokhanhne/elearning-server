import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LevelEntity } from './Level.entity';
import { RoleEntity } from './Role.entity';
import { SubjectClassEntity } from './SubjectClass.entity';

@Entity('lecturers')
export class LecturersEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  leturer_id: number;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  leturer_firstName: string;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  leturer_lastName: string;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  leturer_avatar: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  leturer_website: string;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  leturer_birthday: Date;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  leturer_phone: string;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  leturer_email: string;

  @Column({ type: 'simple-json' })
  leturer_otherInfo: object;
  @ManyToOne((type) => LevelEntity, (le) => le.lecturers)
  @JoinColumn({ name: 'level_id' })
  leturer_level: LevelEntity;
  @OneToOne((type) => RoleEntity)
  @JoinColumn({ name: 'student_role', referencedColumnName: 'role_id' })
  role_id: RoleEntity;

  @OneToMany((type) => SubjectClassEntity, (sc) => sc.subject_class_leturers)
  lecturers_classes: SubjectClassEntity[];
}
