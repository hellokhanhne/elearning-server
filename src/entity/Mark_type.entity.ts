import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mark_type')
export class MarkTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  mark_type_id: number;
  @Column({
    nullable: false,
  })
  mark_type_name: string;
}
