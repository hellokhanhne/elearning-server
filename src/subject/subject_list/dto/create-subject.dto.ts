import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  subject_name: string;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  subject_desc: string;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  subject_credits: number;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  subject_short_name: string;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  subject_type_id: string;

  subject_img: string;
}
