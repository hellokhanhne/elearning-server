import { Test, TestingModule } from '@nestjs/testing';
import { NewsCategoryService } from './news_category.service';

describe('NewsCategoryService', () => {
  let service: NewsCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsCategoryService],
    }).compile();

    service = module.get<NewsCategoryService>(NewsCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
