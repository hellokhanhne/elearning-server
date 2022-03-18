import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @ApiProperty()
  role_title: string;
  @IsNotEmpty()
  @ApiProperty()
  role_desc: string;
}
