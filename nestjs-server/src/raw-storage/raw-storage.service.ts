import { Injectable } from '@nestjs/common';
import { CreateRawStorageDto } from './dto/create-raw-storage.dto';
import { UpdateRawStorageDto } from './dto/update-raw-storage.dto';

@Injectable()
export class RawStorageService {
  create(createRawStorageDto: CreateRawStorageDto) {
    return 'This action adds a new rawStorage';
  }

  findAll() {
    return `This action returns all rawStorage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rawStorage`;
  }

  update(id: number, updateRawStorageDto: UpdateRawStorageDto) {
    return `This action updates a #${id} rawStorage`;
  }

  remove(id: number) {
    return `This action removes a #${id} rawStorage`;
  }
}
