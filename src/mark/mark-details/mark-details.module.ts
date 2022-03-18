import { Module } from '@nestjs/common';
import { MarkDetailsService } from './mark-details.service';
import { MarkDetailsController } from './mark-details.controller';

@Module({
  controllers: [MarkDetailsController],
  providers: [MarkDetailsService]
})
export class MarkDetailsModule {}
