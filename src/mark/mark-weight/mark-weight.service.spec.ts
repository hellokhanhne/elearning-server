import { Test, TestingModule } from '@nestjs/testing';
import { MarkWeightService } from './mark-weight.service';

describe('MarkWeightService', () => {
  let service: MarkWeightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarkWeightService],
    }).compile();

    service = module.get<MarkWeightService>(MarkWeightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
