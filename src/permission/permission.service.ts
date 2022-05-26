import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/entity/Permission.entity';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private permissionRep: Repository<PermissionEntity>,
  ) {}

  async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionEntity> {
    const permission = new PermissionEntity();
    permission.permission_desc = createPermissionDto.permission_desc;
    permission.permission_title = createPermissionDto.permission_title;
    permission.permission_url = createPermissionDto.permission_url;
    await this.permissionRep.save(permission);
    return permission;
  }

  async findAll() {
    const permissions = await this.permissionRep.find();
    return permissions;
  }

  async findByArray(permissionsArr: number[]): Promise<PermissionEntity[]> {
    const permissions = await this.permissionRep
      .createQueryBuilder('permissions')
      .where('permissions.permission_id IN (:...ids)', { ids: permissionsArr })
      .getMany();
    return permissions;
  }

  async findOne(id: number): Promise<PermissionEntity> {
    const permission = await this.permissionRep.findOne(id);
    console.log(permission);
    return permission;
  }

  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<PermissionEntity> {
    const permission = await this.permissionRep.findOne(id);
    permission.permission_desc = updatePermissionDto.permission_desc;
    permission.permission_title = updatePermissionDto.permission_title;
    permission.permission_url = updatePermissionDto.permission_url;
    await this.permissionRep.save(permission);
    return permission;
  }

  async remove(id: number): Promise<Boolean> {
    try {
      const permission = await this.permissionRep.findOne(id);
      await this.permissionRep.remove(permission);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
