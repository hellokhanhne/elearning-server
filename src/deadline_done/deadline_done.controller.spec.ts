import { Test, TestingModule } from '@nestjs/testing';
import { DeadlineDoneController } from './deadline_done.controller';
import { DeadlineDoneService } from './deadline_done.service';

describe('DeadlineDoneController', () => {
  let controller: DeadlineDoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeadlineDoneController],
      providers: [DeadlineDoneService],
    }).compile();

    controller = module.get<DeadlineDoneController>(DeadlineDoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
