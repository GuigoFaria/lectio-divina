import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateLectioneDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;
  @IsNotEmpty()
  @ApiProperty()
  @IsInt()
  totalTime: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  practicalResolution: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  prayerTime: number;
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
