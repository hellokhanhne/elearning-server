import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty()
  @ApiProperty()
  subject_name: string;
  @IsNotEmpty()
  @ApiProperty()
  subject_desc: string;
  @IsNotEmpty()
  @ApiProperty()
  subject_credits: number;
}
