import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDeadlineDoneDto {
  attachment: string;
  @ApiProperty()
  @IsNotEmpty()
  assigment_id: number;
}
