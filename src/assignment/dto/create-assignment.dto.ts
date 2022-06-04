import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAssignmentDto {
  @ApiProperty()
  @IsNotEmpty()
  desc: string;
  @ApiProperty()
  @IsNotEmpty()
  deadline: Date;
  @ApiProperty()
  @IsNotEmpty()
  content: string;
  @ApiProperty()
  @IsNotEmpty()
  subject_class_id: number;
  attachment: string;
}
