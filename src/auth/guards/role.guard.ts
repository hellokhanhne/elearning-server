import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entity/Role.entity';
import { Repository } from 'typeorm';
import { RequestDto } from '../dto/request.dto';

export const RoleGuard = (): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    constructor(
      @InjectRepository(RoleEntity) private roleRep: Repository<RoleEntity>,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<RequestDto>();

      const role: RoleEntity = await this.roleRep.findOne(request.user.role, {
        relations: ['role_permissions'],
      });

      let isNext = false;

      for (let per of role.role_permissions) {
        if (
          per.permission_url === request.route.path &&
          per.permission_desc.toUpperCase() === request.method.toUpperCase()
        ) {
          return (isNext = true);
        }
      }

      return isNext;
    }
  }
  return mixin(RoleGuardMixin);
};
