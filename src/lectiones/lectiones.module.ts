import { Module } from '@nestjs/common';
import { LectionesService } from './lectiones.service';
import { LectionesController } from './lectiones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lectione } from './entities/lectione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lectione])],
  controllers: [LectionesController],
  providers: [LectionesService],
})
export class LectionesModule {}
