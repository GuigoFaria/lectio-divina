import { Body, Injectable } from '@nestjs/common';
import { CreateLectioneDto } from './dto/create-lectione.dto';
import { Lectione } from './entities/lectione.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LectionesService {
  constructor(
    @InjectRepository(Lectione)
    private readonly lectionesRepository: Repository<Lectione>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async create(
    @Body() createLectioneDto: CreateLectioneDto,
  ): Promise<Lectione> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: createLectioneDto.userId },
      });
      if (user) {
        const lectione = this.lectionesRepository.create({
          ...createLectioneDto,
        });
        lectione.user = user;
        return await this.lectionesRepository.save(lectione);
      }
    } catch (error) {
      console.error(error);
    }
  }

  findAllByUser(userId: string) {
    return this.lectionesRepository.find({ where: { user: { id: userId } } });
  }

  findOne(id: string) {
    return this.lectionesRepository.findOne({ where: { id } });
  }
}
