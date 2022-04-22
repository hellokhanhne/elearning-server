import { Module } from '@nestjs/common';
import { MarkWeightService } from './mark-weight.service';
import { MarkWeightController } from './mark-weight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarkWeightEntity } from 'src/entity/Mark_weight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarkWeightEntity])],
  controllers: [MarkWeightController],
  providers: [MarkWeightService],
})
export class MarkWeightModule {}
