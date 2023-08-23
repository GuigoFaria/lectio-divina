import { Injectable } from '@nestjs/common';
import { CreateLectioneDto } from './dto/create-lectione.dto';
import { UpdateLectioneDto } from './dto/update-lectione.dto';

@Injectable()
export class LectionesService {
  create(createLectioneDto: CreateLectioneDto) {
    return 'This action adds a new lectione';
  }

  findAll() {
    return `This action returns all lectiones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lectione`;
  }

  update(id: number, updateLectioneDto: UpdateLectioneDto) {
    return `This action updates a #${id} lectione`;
  }

  remove(id: number) {
    return `This action removes a #${id} lectione`;
  }
}
