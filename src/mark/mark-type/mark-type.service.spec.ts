import { Test, TestingModule } from '@nestjs/testing';
import { MarkTypeService } from './mark-type.service';

describe('MarkTypeService', () => {
  let service: MarkTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarkTypeService],
    }).compile();

    service = module.get<MarkTypeService>(MarkTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
