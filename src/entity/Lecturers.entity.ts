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
  @Column('text', { nullable: true })
  leturer_firstName: string;
  @Column('text', { nullable: true })
  leturer_lastName: string;
  @Column('text', { nullable: true })
  leturer_avatar: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  leturer_website: string;
  @Column('text', { nullable: true })
  leturer_birthday: Date;
  @Column('text', { nullable: true })
  leturer_phone: string;
  @Column('text', { nullable: true })
  leturer_email: string;

  @ManyToOne((type) => LevelEntity, (le) => le.lecturers)
  @JoinColumn({ name: 'level_id' })
  leturer_level: LevelEntity;
  @ManyToOne((type) => RoleEntity)
  @JoinColumn({ name: 'leturer_role', referencedColumnName: 'role_id' })
  role_id: RoleEntity;

  @OneToMany((type) => SubjectClassEntity, (sc) => sc.subject_class_leturer)
  lecturers_classes: SubjectClassEntity[];
}
