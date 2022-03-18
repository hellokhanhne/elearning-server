import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelEntity } from 'src/entity/Level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LevelEntity])],
  controllers: [LevelController],
  providers: [LevelService],
  exports: [LevelModule],
})
export class LevelModule {}
