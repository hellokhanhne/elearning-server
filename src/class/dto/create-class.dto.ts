import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty()
  @ApiProperty()
  class_name: string;
  @IsNotEmpty()
  @ApiProperty()
  faculty_id: string;
}
