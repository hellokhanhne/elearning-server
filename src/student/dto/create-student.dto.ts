import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  student_email: string;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  student_mobile: string;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  student_fisrtName: string;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  student_lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  student_address: string;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  role_id: number;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  class_id: number;
  student_avatar: string;
}
