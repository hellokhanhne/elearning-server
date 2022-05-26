import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entity/Role.entity';
import { PermissionService } from 'src/permission/permission.service';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRolePermission } from './dto/update-role-permission.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity) private roleRep: Repository<RoleEntity>,
    private permissionService: PermissionService,
  ) {}
  async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    try {
      const role = new RoleEntity();
      role.role_title = createRoleDto.role_title;
      role.role_desc = createRoleDto.role_desc;
      await this.roleRep.save(role);
      return role;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<RoleEntity[]> {
    try {
      const role = await this.roleRep.find({ relations: ['role_permissions'] });
      return role;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number): Promise<RoleEntity> {
    try {
      const role = await this.roleRep.findOne(id, {
        relations: ['role_permissions'],
      });
      return role;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
    try {
      const role: RoleEntity = await this.roleRep.findOne(id);
      role.role_title = updateRoleDto.role_title;
      role.role_desc = updateRoleDto.role_desc;
      await this.roleRep.save(role);
      return role;
    } catch (error) {
      console.log(error);
    }
  }

  async updateRolePermission(
    id: string,
    updateRolePermission: UpdateRolePermission,
  ) {
    try {
      const role = await this.roleRep.findOne(id);
      const permissions = await this.permissionService.findByArray(
        updateRolePermission.permissionIds,
      );
      role.role_permissions = permissions;
      return await this.roleRep.save(role);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number): Promise<Boolean> {
    try {
      const role = await this.roleRep.findOne(id);
      await this.roleRep.remove(role);
      return true;
    } catch (error) {
      return false;
    }
  }
}
