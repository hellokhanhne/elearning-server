import { ApiProperty } from '@nestjs/swagger';
export class CreateLecturerDto {
  @ApiProperty()
  leturer_firstName: string;
  @ApiProperty()
  leturer_lastName: string;
  @ApiProperty()
  leturer_avatar: string;
  @ApiProperty()
  leturer_website: string;
  @ApiProperty()
  leturer_birthday: Date;
  @ApiProperty()
  leturer_phone: string;
  @ApiProperty()
  leturer_email: string;
  @ApiProperty()
  leturer_otherInfo: object;
  @ApiProperty()
  leturer_level: number;
  @ApiProperty()
  role_id: number;
}
