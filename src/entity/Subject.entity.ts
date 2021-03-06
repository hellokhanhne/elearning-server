import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubjectClassEntity } from './SubjectClass.entity';
import { SubjectTypeEntity } from './SubjectType.entity';

@Entity('subjects')
export class SubjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  subject_id: number;
  @Column({
    type: 'varchar',
    length: 250,
  })
  subject_name: string;
  @Column({
    type: 'varchar',
    length: '50',
  })
  subject_short_name: string;
  @Column('text')
  subject_desc: string;
  @Column({
    type: 'int',
  })
  subject_credits: number;
  @Column({
    nullable: true,
  })
  subject_img: string;

  @ManyToOne((type) => SubjectTypeEntity, (st) => st.subject_classes)
  @JoinColumn({
    name: 'subject_type_id',
  })
  subject_type: SubjectTypeEntity;

  @OneToMany((type) => SubjectClassEntity, (sbl) => sbl.subject)
  subject_classes: SubjectClassEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
