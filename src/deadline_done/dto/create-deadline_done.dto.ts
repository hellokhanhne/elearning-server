import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateDeadlineDoneDto {
  attachment: string;
  @Transform(({ value }) => value)
  @ApiProperty()
  @IsNotEmpty()
  assigment_id: number;
}
