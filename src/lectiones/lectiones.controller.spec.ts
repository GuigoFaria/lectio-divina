import { Test, TestingModule } from '@nestjs/testing';
import { LectionesController } from './lectiones.controller';
import { LectionesService } from './lectiones.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { mockUserRepository } from 'src/users/mocks/UserRepository.mock';
import { Lectione } from './entities/lectione.entity';
import { mockLectioneRepository } from './mocks/LectioneRepository.mock';

describe('LectionesController', () => {
  let controller: LectionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LectionesController],
      providers: [
        LectionesService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Lectione),
          useValue: mockLectioneRepository,
        },
      ],
    }).compile();

    controller = module.get<LectionesController>(LectionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
