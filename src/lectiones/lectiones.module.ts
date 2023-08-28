import { Module } from '@nestjs/common';
import { LectionesService } from './lectiones.service';
import { LectionesController } from './lectiones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lectione } from './entities/lectione.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lectione, User])],
  controllers: [LectionesController],
  providers: [LectionesService],
})
export class LectionesModule {}
