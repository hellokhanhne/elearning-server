import { Test, TestingModule } from '@nestjs/testing';
import { LecturersService } from './lecturers.service';

describe('LecturersService', () => {
  let service: LecturersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LecturersService],
    }).compile();

    service = module.get<LecturersService>(LecturersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
