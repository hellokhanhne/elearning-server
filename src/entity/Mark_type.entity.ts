import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mark_type')
export class MarkTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  mark_type_id: number;
  @Column({
    nullable: false,
  })
  mark_type_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
