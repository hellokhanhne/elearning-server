import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionEntity } from './Permission.entity';

@Entity()
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  role_id: number;
  @Column({
    type: 'varchar',
    length: '255',
  })
  role_title: string;
  @Column({
    type: 'text',
  })
  role_desc: string;
  @ManyToMany((type) => PermissionEntity, (per) => per.permission_roles)
  @JoinTable()
  role_permissions: PermissionEntity[];
}
