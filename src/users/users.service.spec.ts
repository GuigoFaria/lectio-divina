import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { mockUserRepository } from './mocks/UserRepository.mock';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repositoryUser: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repositoryUser = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find one user by id', async () => {
    const expectedUser: User = {
      email: 'email',
      id: '1',
      name: 'name',
      password: 'password',
      sequenceDays: 1,
      timeDisplayedInSeconds: 1,
      createdAt: new Date('01-01-2022'),
      updatedAt: new Date('01-01-2022'),
    };

    const result = await service.findOne('1');
    expect(result).toStrictEqual(expectedUser);
  });
});
