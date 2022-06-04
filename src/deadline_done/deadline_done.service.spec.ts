import { Test, TestingModule } from '@nestjs/testing';
import { DeadlineDoneService } from './deadline_done.service';

describe('DeadlineDoneService', () => {
  let service: DeadlineDoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeadlineDoneService],
    }).compile();

    service = module.get<DeadlineDoneService>(DeadlineDoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
