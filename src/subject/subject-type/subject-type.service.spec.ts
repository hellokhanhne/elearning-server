import { Test, TestingModule } from '@nestjs/testing';
import { SubjectTypeService } from './subject-type.service';

describe('SubjectTypeService', () => {
  let service: SubjectTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjectTypeService],
    }).compile();

    service = module.get<SubjectTypeService>(SubjectTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
