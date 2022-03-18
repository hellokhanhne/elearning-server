import { PartialType } from '@nestjs/swagger';
import { CreateMarkDetailDto } from './create-mark-detail.dto';

export class UpdateMarkDetailDto extends PartialType(CreateMarkDetailDto) {}
