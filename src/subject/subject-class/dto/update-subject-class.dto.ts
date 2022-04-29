import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSubjectClassDto } from './create-subject-class.dto';

export class UpdateSubjectClassDto extends PartialType(CreateSubjectClassDto) {}

export class UpdateStudentClassDto {
  @ApiProperty()
  student_ids: number[];
}
