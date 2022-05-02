import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NewsEntity } from '../entity/News';

@Entity('news_category')
export class NewsCategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  news_category_id: number;
  @Column()
  news_category_name: string;
  @Column()
  news_category_desc: string;

  @OneToMany((type) => NewsEntity, (std) => std.news_category)
  news: NewsEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
