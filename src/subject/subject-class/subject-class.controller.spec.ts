import { Test, TestingModule } from '@nestjs/testing';
import { SubjectClassController } from './subject-class.controller';
import { SubjectClassService } from './subject-class.service';

describe('SubjectClassController', () => {
  let controller: SubjectClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectClassController],
      providers: [SubjectClassService],
    }).compile();

    controller = module.get<SubjectClassController>(SubjectClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
