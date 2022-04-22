import { ApiProperty } from '@nestjs/swagger';

export class CreateMarkTypeDto {
  @ApiProperty()
  mark_type_name: string;
}
