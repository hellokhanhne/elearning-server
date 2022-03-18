import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionEntity } from './Permission.entity';
import { StudentEntity } from './Student.entity';

@Entity('roles')
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
  @JoinTable({
    name: 'role_permission',
  })
  role_permissions: PermissionEntity[];
  @OneToMany((type) => StudentEntity, (std) => std.role_id)
  students: StudentEntity[];
}
