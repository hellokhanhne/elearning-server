import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column()
  subject_img: string;
}
