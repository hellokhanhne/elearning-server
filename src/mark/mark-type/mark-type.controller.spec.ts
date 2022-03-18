import { Test, TestingModule } from '@nestjs/testing';
import { MarkTypeController } from './mark-type.controller';
import { MarkTypeService } from './mark-type.service';

describe('MarkTypeController', () => {
  let controller: MarkTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarkTypeController],
      providers: [MarkTypeService],
    }).compile();

    controller = module.get<MarkTypeController>(MarkTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
