import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSubjectTypeDto {
  @IsNotEmpty()
  @ApiProperty()
  subject_type_name: string;
}
