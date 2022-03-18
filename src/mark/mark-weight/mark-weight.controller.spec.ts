import { Test, TestingModule } from '@nestjs/testing';
import { MarkWeightController } from './mark-weight.controller';
import { MarkWeightService } from './mark-weight.service';

describe('MarkWeightController', () => {
  let controller: MarkWeightController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarkWeightController],
      providers: [MarkWeightService],
    }).compile();

    controller = module.get<MarkWeightController>(MarkWeightController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
