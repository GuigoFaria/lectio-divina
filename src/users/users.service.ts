import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await genSalt();
    const hashedPassword = await hash(createUserDto.password, salt);
    const user = await this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await this.usersRepository.save(user);
    return savedUser;
  }

  findOne(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  findOneAuthOrFail(conditions: FindOptionsWhere<User>) {
    return this.usersRepository.findOneOrFail({
      where: { ...conditions },
      select: ['id', 'name', 'email', 'password'],
    });
  }
}
