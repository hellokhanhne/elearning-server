import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
export class CreateLecturerDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  @Transform(({ value }) => value)
  leturer_firstName: string;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  leturer_lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  leturer_website: string;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  leturer_birthday: Date;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  leturer_phone: string;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  leturer_email: string;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  leturer_otherInfo: object;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  leturer_level: number;
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  role_id: number;
  leturer_avatar: string;
}
