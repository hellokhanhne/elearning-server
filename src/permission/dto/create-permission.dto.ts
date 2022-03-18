import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  @ApiProperty()
  permission_title: string;
  @IsNotEmpty()
  @ApiProperty()
  permission_url: string;
  @IsNotEmpty()
  @ApiProperty()
  permission_desc: string;
}
