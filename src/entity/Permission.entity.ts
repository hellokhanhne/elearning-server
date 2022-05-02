import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from './Role.entity';

@Entity('permissions')
export class PermissionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  permission_id: number;
  @Column({
    type: 'varchar',
    length: '255',
  })
  permission_title: string;
  @Column({
    type: 'varchar',
  })
  permission_url: string;
  @Column({
    type: 'text',
  })
  permission_desc: string;
  @ManyToMany((type) => RoleEntity, (rol) => rol.role_permissions)
  permission_roles: RoleEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
