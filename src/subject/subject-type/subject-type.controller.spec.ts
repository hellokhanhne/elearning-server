import { Test, TestingModule } from '@nestjs/testing';
import { SubjectTypeController } from './subject-type.controller';
import { SubjectTypeService } from './subject-type.service';

describe('SubjectTypeController', () => {
  let controller: SubjectTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectTypeController],
      providers: [SubjectTypeService],
    }).compile();

    controller = module.get<SubjectTypeController>(SubjectTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
