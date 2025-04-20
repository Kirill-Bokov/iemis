import { PartialType } from '@nestjs/mapped-types';
import { CreateRawStorageDto } from './create-raw-storage.dto';

export class UpdateRawStorageDto extends PartialType(CreateRawStorageDto) {}
