import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawMaterial } from './entities/raw-material.entity';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';

@Injectable()
export class RawMaterialService {
  constructor(
    @InjectRepository(RawMaterial)
    private rawMaterialRepository: Repository<RawMaterial>,
  ) {}

  async create(dto: CreateRawMaterialDto): Promise<RawMaterial> {
    const entity = this.rawMaterialRepository.create(dto);
    return this.rawMaterialRepository.save(entity);
  }

  findAll(): Promise<RawMaterial[]> {
    return this.rawMaterialRepository.find();
  }

  async findOne(id: string): Promise<RawMaterial> {
    const entry = await this.rawMaterialRepository.findOneBy({ id });
    if (!entry) throw new NotFoundException('Raw material not found');
    return entry;
  }

  async update(id: string, dto: UpdateRawMaterialDto): Promise<RawMaterial> {
    const entry = await this.rawMaterialRepository.findOneBy({ id });
    if (!entry) throw new NotFoundException('Raw material not found');

    if (dto.name) {
      entry.name = dto.name;
    }

    if (dto.price !== undefined) {
      entry.price = dto.price;
    }

    if (dto.measure) {
      entry.measure = dto.measure;
    }

    return this.rawMaterialRepository.save(entry);
  }

  async remove(id: string): Promise<void> {
    const entry = await this.rawMaterialRepository.findOneBy({ id });
    if (!entry) throw new NotFoundException('Raw material not found');
    await this.rawMaterialRepository.remove(entry);
  }
}
