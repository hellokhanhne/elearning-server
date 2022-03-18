import { Test, TestingModule } from '@nestjs/testing';
import { MarkDetailsController } from './mark-details.controller';
import { MarkDetailsService } from './mark-details.service';

describe('MarkDetailsController', () => {
  let controller: MarkDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarkDetailsController],
      providers: [MarkDetailsService],
    }).compile();

    controller = module.get<MarkDetailsController>(MarkDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
