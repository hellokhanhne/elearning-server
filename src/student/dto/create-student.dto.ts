import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty()
  student_email: string;
  @ApiProperty()
  student_mobile: string;
  @ApiProperty()
  student_fisrtName: string;
  @ApiProperty()
  student_lastName: string;
  @ApiProperty()
  student_address: string;
  @ApiProperty()
  student_avatar: string;
  @ApiProperty()
  role_id: number;
}
