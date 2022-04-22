import { ApiProperty } from '@nestjs/swagger';

export class CreateTimetableDto {
  @ApiProperty()
  day_of_week: number;
  @ApiProperty()
  lession: string;
  @ApiProperty()
  classroom: string;
  @ApiProperty()
  classroom_subject_class_id: number;
}
