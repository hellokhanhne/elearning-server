import { PartialType } from '@nestjs/swagger';
import { CreateDeadlineDoneDto } from './create-deadline_done.dto';

export class UpdateDeadlineDoneDto extends PartialType(CreateDeadlineDoneDto) {}
