import { PartialType } from '@nestjs/mapped-types';
import { CreateLectioneDto } from './create-lectione.dto';

export class UpdateLectioneDto extends PartialType(CreateLectioneDto) {}
