import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subject_type')
export class SubjectTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  subject_type_id: number;
  @Column({
    type: 'varchar',
    length: 50,
  })
  subject_type_name: string;
}
