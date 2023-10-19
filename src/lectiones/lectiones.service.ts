import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLectioneDto } from './dto/create-lectione.dto';
import { Lectione } from './entities/lectione.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LectionesService {
  constructor(
    @InjectRepository(Lectione)
    private readonly lectionesRepository: Repository<Lectione>,
    private readonly usersService: UsersService,
  ) {}
  async create(createLectioneDto: CreateLectioneDto): Promise<Lectione> {
    const user = await this.usersService.findOne(createLectioneDto.userId);
    if (!user) throw new BadRequestException('User not found');

    const lectione = this.lectionesRepository.create({
      ...createLectioneDto,
    });

    lectione.user = user;

    return this.lectionesRepository.save(lectione);
  }

  findAllByUser(userId: string) {
    return this.lectionesRepository.find({
      where: { user: { id: userId } },
    });
  }

  findOne(id: string) {
    return this.lectionesRepository.findOne({ where: { id } });
  }
}
