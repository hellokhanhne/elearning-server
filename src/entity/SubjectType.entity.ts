import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubjectEntity } from './Subject.entity';

@Entity('subject_type')
export class SubjectTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  subject_type_id: number;
  @Column({
    type: 'varchar',
    length: 50,
  })
  subject_type_name: string;

  @OneToMany((type) => SubjectEntity, (sb) => sb.subject_type)
  subject_classes: SubjectEntity[];
}
