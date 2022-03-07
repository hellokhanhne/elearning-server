import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  role_title: string;
  @IsNotEmpty()
  role_desc: string;
}
