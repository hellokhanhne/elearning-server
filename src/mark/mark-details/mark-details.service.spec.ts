import { Test, TestingModule } from '@nestjs/testing';
import { MarkDetailsService } from './mark-details.service';

describe('MarkDetailsService', () => {
  let service: MarkDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarkDetailsService],
    }).compile();

    service = module.get<MarkDetailsService>(MarkDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
