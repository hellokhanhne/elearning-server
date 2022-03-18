import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LecturersEntity } from './Lecturers.entity';

@Entity('levels')
export class LevelEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  level_id: number;
  @Column()
  level_name: string;
  @Column()
  level_desc: string;
  @OneToMany((type) => LecturersEntity, (lec) => lec.leturer_level)
  lecturers: LecturersEntity[];
}
