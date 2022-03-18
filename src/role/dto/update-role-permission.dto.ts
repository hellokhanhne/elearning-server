import { ApiProperty } from '@nestjs/swagger';

export class UpdateRolePermission {
  @ApiProperty()
  permissionIds: number[];
}
