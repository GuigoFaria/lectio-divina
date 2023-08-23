import { Test, TestingModule } from '@nestjs/testing';
import { LectionesController } from './lectiones.controller';
import { LectionesService } from './lectiones.service';

describe('LectionesController', () => {
  let controller: LectionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LectionesController],
      providers: [LectionesService],
    }).compile();

    controller = module.get<LectionesController>(LectionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
