import { PartialType } from '@nestjs/swagger';
import { CreateMarkWeightDto } from './create-mark-weight.dto';

export class UpdateMarkWeightDto extends PartialType(CreateMarkWeightDto) {}
