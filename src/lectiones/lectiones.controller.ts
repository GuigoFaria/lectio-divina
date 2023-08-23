import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LectionesService } from './lectiones.service';
import { CreateLectioneDto } from './dto/create-lectione.dto';
import { UpdateLectioneDto } from './dto/update-lectione.dto';

@Controller('lectiones')
export class LectionesController {
  constructor(private readonly lectionesService: LectionesService) {}

  @Post()
  create(@Body() createLectioneDto: CreateLectioneDto) {
    return this.lectionesService.create(createLectioneDto);
  }

  @Get()
  findAll() {
    return this.lectionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lectionesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLectioneDto: UpdateLectioneDto,
  ) {
    return this.lectionesService.update(+id, updateLectioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lectionesService.remove(+id);
  }
}
