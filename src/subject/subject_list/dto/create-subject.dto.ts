import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty()
  @Transform(({ value }) => value)
  @ApiProperty()
  subject_name: string;
  @IsNotEmpty()
  @Transform(({ value }) => value)
  @ApiProperty()
  subject_desc: string;
  @IsNotEmpty()
  @Transform(({ value }) => value)
  @ApiProperty()
  subject_credits: number;
  @IsNotEmpty()
  @Transform(({ value }) => value)
  @ApiProperty()
  subject_short_name: string;

  subject_img: string;
}
