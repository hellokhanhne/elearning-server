import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateAttendanceDto {
  @ApiProperty()
  @IsNotEmpty()
  students: number[];
  @ApiProperty()
  @IsNotEmpty()
  timetable_id: number;
  @ApiProperty()
  @IsNotEmpty()
  attendance_desc: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  attendance_date: Date;
}
