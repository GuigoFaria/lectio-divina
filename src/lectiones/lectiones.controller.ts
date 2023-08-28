import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LectionesService } from './lectiones.service';
import { CreateLectioneDto } from './dto/create-lectione.dto';

@Controller('lectiones')
export class LectionesController {
  constructor(private readonly lectionesService: LectionesService) {}

  @Post()
  create(@Body() createLectioneDto: CreateLectioneDto) {
    return this.lectionesService.create(createLectioneDto);
  }

  @Get('user/:id')
  findAll(@Param('id') id: string) {
    return this.lectionesService.findAllByUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lectionesService.findOne(id);
  }
}
