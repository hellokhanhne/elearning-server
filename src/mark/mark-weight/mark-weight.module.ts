import { Module } from '@nestjs/common';
import { MarkWeightService } from './mark-weight.service';
import { MarkWeightController } from './mark-weight.controller';

@Module({
  controllers: [MarkWeightController],
  providers: [MarkWeightService]
})
export class MarkWeightModule {}
