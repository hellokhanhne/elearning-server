import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NewsCategoryEntity } from './News_category';

@Entity('news')
export class NewsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  news_id: number;
  @Column()
  news_image: string;
  @Column()
  news_title: string;
  @Column()
  news_desc: string;
  @Column('text')
  news_content: string;

  @ManyToOne((type) => NewsCategoryEntity, (t) => t.news)
  @JoinColumn({ name: 'news_category_id' })
  news_category: NewsCategoryEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
