import { Test, TestingModule } from '@nestjs/testing';
import { SubjectClassService } from './subject-class.service';

describe('SubjectClassService', () => {
  let service: SubjectClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjectClassService],
    }).compile();

    service = module.get<SubjectClassService>(SubjectClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
