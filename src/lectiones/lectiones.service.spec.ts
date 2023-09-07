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
  it('should not create a lectione', async () => {
    const createDto: CreateLectioneDto = {
      text: 'text',
      totalTime: 10,
      practicalResolution: 'practicalResolution',
      prayerTime: 10,
      userId: '',
    };
    const spyFindOne = jest
      .spyOn(repositoryUser, 'findOne')
      .mockRejectedValue(null);
    try {
      await service.create(createDto);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(spyFindOne).toHaveBeenCalledWith({
        where: { id: createDto.userId },
      });
    }
  });

  it('should find all lectiones by user', async () => {
    const expectedLectiones: Lectione[] = [
      {
        id: '1',
        updatedAt: new Date(),
        createdAt: new Date(),
        practicalResolution: 'practicalResolution',
        prayerTime: 10,
        text: 'text',
        totalTime: 10,
        user: user,
      },
    ];
    const spyFind = jest
      .spyOn(repositoryLectione, 'find')
      .mockResolvedValue([...expectedLectiones]);

    const result = await service.findAllByUser('1');
    expect(spyFind).toHaveBeenCalledWith({ where: { user: { id: '1' } } });
    expect(result).toStrictEqual(expectedLectiones);
  });

  it('should not find all lectiones by user', async () => {
    const spyFind = jest
      .spyOn(repositoryLectione, 'find')
      .mockRejectedValue(new Error());
    try {
      await service.findAllByUser('1');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(spyFind).toHaveBeenCalledWith({ where: { user: { id: '1' } } });
    }
  });

  it('should find one lectione by id', async () => {
    const expectedLectione: Lectione = {
      id: '1',
      updatedAt: new Date(),
      createdAt: new Date(),
      practicalResolution: 'practicalResolution',
      prayerTime: 10,
      text: 'text',
      totalTime: 10,
      user: user,
    };
    const spyFind = jest
      .spyOn(repositoryLectione, 'findOne')
      .mockResolvedValue(expectedLectione);

    const result = await service.findOne('1');
    expect(spyFind).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(result).toStrictEqual(expectedLectione);
  });
  it('should not find all lectiones by user', async () => {
    const spyFind = jest
      .spyOn(repositoryLectione, 'findOne')
      .mockRejectedValue(new Error());
    try {
      await service.findAllByUser('1');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(spyFind).toHaveBeenCalledWith({ where: { id: '1' } });
    }
  });
});
