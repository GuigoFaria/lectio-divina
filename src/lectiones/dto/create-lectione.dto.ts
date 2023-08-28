import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateLectioneDto {
  @ApiProperty()
  text: string;
  @ApiProperty()
  totalTime: number;
  @ApiProperty()
  practicalResolution: string;
  @ApiProperty()
  prayerTime: number;
  @ApiProperty()
  @IsUUID()
  userId: string;
}
