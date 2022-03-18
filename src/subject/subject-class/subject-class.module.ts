import { Module } from '@nestjs/common';
import { SubjectClassService } from './subject-class.service';
import { SubjectClassController } from './subject-class.controller';

@Module({
  controllers: [SubjectClassController],
  providers: [SubjectClassService]
})
export class SubjectClassModule {}
