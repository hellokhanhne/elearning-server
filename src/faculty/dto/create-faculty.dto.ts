import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFacultyDto {
  @IsNotEmpty()
  @ApiProperty()
  faculty_name: string;
  @IsNotEmpty()
  @ApiProperty()
  faculty_email: string;
}
