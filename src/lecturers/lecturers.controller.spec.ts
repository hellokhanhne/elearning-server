import { Test, TestingModule } from '@nestjs/testing';
import { LecturersController } from './lecturers.controller';
import { LecturersService } from './lecturers.service';

describe('LecturersController', () => {
  let controller: LecturersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LecturersController],
      providers: [LecturersService],
    }).compile();

    controller = module.get<LecturersController>(LecturersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
