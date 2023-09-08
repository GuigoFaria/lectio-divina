import { Test, TestingModule } from '@nestjs/testing';
import { LectionesController } from './lectiones.controller';
import { LectionesService } from './lectiones.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { mockUserRepository } from 'src/users/mocks/UserRepository.mock';
import { Lectione } from './entities/lectione.entity';
import { mockLectioneRepository } from './mocks/LectioneRepository.mock';
import { CreateLectioneDto } from './dto/create-lectione.dto';

describe('LectionesController', () => {
  let controller: LectionesController;
  let service: LectionesService;
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
    service = module.get<LectionesService>(LectionesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
      updatedAt: new Date(),
      createdAt: new Date(),
      id: '1',
    };

    const spyServiceCreate = jest
      .spyOn(service, 'create')
      .mockResolvedValue(expectedReturn);

    const result = await controller.create(createDto);
    expect(spyServiceCreate).toHaveBeenCalledWith(createDto);
    expect(result).toStrictEqual(expectedReturn);
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
    const spyServiceFindOne = jest
      .spyOn(service, 'findOne')
      .mockResolvedValue(expectedLectione);

    const result = await controller.findOne('1');
    expect(spyServiceFindOne).toHaveBeenCalledWith('1');
    expect(result).toStrictEqual(expectedLectione);
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
    const spyServiceFindAll = jest
      .spyOn(service, 'findAllByUser')
      .mockResolvedValue(expectedLectiones);

    const result = await controller.findAll('1');
    expect(spyServiceFindAll).toHaveBeenCalledWith('1');
    expect(result).toStrictEqual(expectedLectiones);
  });
});
