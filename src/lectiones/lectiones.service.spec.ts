import { Test, TestingModule } from '@nestjs/testing';
import { LectionesService } from './lectiones.service';

describe('LectionesService', () => {
  let service: LectionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LectionesService],
    }).compile();

    service = module.get<LectionesService>(LectionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
