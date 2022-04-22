import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectClassDto {
  @ApiProperty()
  subject_class_name: string;
  @ApiProperty()
  subject_class_short_name: string;
  @ApiProperty()
  school_year: string;
  @ApiProperty()
  semester: number;
  @ApiProperty()
  date_start: Date;
  @ApiProperty()
  date_end: Date;
  @ApiProperty()
  lecturer_id: number;
}
