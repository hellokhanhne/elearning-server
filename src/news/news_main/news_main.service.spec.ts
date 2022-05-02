import { Test, TestingModule } from '@nestjs/testing';
import { NewsMainService } from './news_main.service';

describe('NewsMainService', () => {
  let service: NewsMainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsMainService],
    }).compile();

    service = module.get<NewsMainService>(NewsMainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
