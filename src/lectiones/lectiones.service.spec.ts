import { Test, TestingModule } from '@nestjs/testing';
import { LectionesService } from './lectiones.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Lectione } from './entities/lectione.entity';

import { CreateLectioneDto } from './dto/create-lectione.dto';
import { Repository } from 'typeorm';
import { mockUserRepository } from 'src/users/mocks/UserRepository.mock';
import { mockLectioneRepository } from './mocks/LectioneRepository.mock';

describe('LectionesService', () => {
  let service: LectionesService;
  let repositoryLectione: Repository<Lectione>;
  let repositoryUser: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<LectionesService>(LectionesService);
    repositoryLectione = module.get<Repository<Lectione>>(
      getRepositoryToken(Lectione),
    );
    repositoryUser = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repositoryLectione).toBeDefined();
    expect(repositoryUser).toBeDefined();
  });

  it('should create a lectione', async () => {
    const createDto: CreateLectioneDto = {
      text: 'text',
      totalTime: 10,
      practicalResolution: 'practicalResolution',
      prayerTime: 10,
      userId: '1',
    };
    const user: User = {
      createdAt: new Date('01-01-2022'),
      email: 'email',
      id: '1',
      name: 'name',
      password: 'password',
      sequenceDays: 1,
      timeDisplayedInSeconds: 1,
      updatedAt: new Date('01-01-2022'),
    };
    const expectedReturn = {
      practicalResolution: createDto.practicalResolution,
      prayerTime: createDto.prayerTime,
      text: createDto.text,
      totalTime: createDto.totalTime,
      user,
      userId: '1',
    };
    const result = await service.create(createDto);
    expect(result).toStrictEqual(expectedReturn);
    expect(repositoryUser.findOne).toHaveBeenCalledWith({
      where: { id: createDto.userId },
    });
    expect(repositoryLectione.create).toHaveBeenCalledWith(expectedReturn);
    expect(repositoryLectione.save).toHaveBeenCalledWith(expectedReturn);
  });
});
