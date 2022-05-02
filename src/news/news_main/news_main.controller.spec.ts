import { Test, TestingModule } from '@nestjs/testing';
import { NewsMainController } from './news_main.controller';
import { NewsMainService } from './news_main.service';

describe('NewsMainController', () => {
  let controller: NewsMainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsMainController],
      providers: [NewsMainService],
    }).compile();

    controller = module.get<NewsMainController>(NewsMainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
