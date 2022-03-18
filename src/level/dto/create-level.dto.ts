import { ApiProperty } from '@nestjs/swagger';

export class CreateLevelDto {
  @ApiProperty()
  level_name: string;
  @ApiProperty()
  level_desc: string;
}
