import { PartialType } from '@nestjs/swagger';
import { CreateMarkTypeDto } from './create-mark-type.dto';

export class UpdateMarkTypeDto extends PartialType(CreateMarkTypeDto) {}
