import { PartialType } from '@nestjs/swagger';
import { CreateSubjectTypeDto } from './create-subject-type.dto';

export class UpdateSubjectTypeDto extends PartialType(CreateSubjectTypeDto) {}
