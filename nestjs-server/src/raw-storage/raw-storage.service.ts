import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawStorage } from './entities/raw-storage.entity';
import { CreateRawStorageDto } from './dto/create-raw-storage.dto';
import { UpdateRawStorageDto } from './dto/update-raw-storage.dto';
import { RawMaterial } from 'src/raw-materials/entities/raw-material.entity';

@Injectable()
export class RawStorageService {
  constructor(
    @InjectRepository(RawStorage)
    private rawStorageRepository: Repository<RawStorage>,

    @InjectRepository(RawMaterial)
    private rawMaterialRepository: Repository<RawMaterial>,
  ) {}

  async create(dto: CreateRawStorageDto): Promise<RawStorage> {
    const rawMaterial = await this.rawMaterialRepository.findOneBy({ id: dto.raw_material_id });
    if (!rawMaterial) {
      throw new NotFoundException('Raw material not found');
    }

    const entity = this.rawStorageRepository.create({
      quantity: dto.quantity,
      raw_material: rawMaterial,
      date_of_receipt: new Date(), // Дата генерируется автоматически
    });

    return this.rawStorageRepository.save(entity);
  }

  findAll(): Promise<RawStorage[]> {
    return this.rawStorageRepository.find({ relations: ['raw_material'] });
  }

  async findOne(id: string): Promise<RawStorage> {
    const entry = await this.rawStorageRepository.findOne({
      where: { id },
      relations: ['raw_material'],
    });
    if (!entry) throw new NotFoundException('Raw storage not found');
    return entry;
  }

  async update(id: string, dto: UpdateRawStorageDto): Promise<RawStorage> {
    const entry = await this.rawStorageRepository.findOneBy({ id });
    if (!entry) throw new NotFoundException('Raw storage not found');

    if (dto.raw_material_id) {
      const rawMaterial = await this.rawMaterialRepository.findOneBy({ id: dto.raw_material_id });
      if (!rawMaterial) {
        throw new NotFoundException('Raw material not found');
      }
      entry.raw_material = rawMaterial;
    }

    if (dto.quantity !== undefined) {
      entry.quantity = dto.quantity;
    }

    return this.rawStorageRepository.save(entry);
  }

  async remove(id: string): Promise<void> {
    const entry = await this.rawStorageRepository.findOneBy({ id });
    if (!entry) throw new NotFoundException('Raw storage not found');
    await this.rawStorageRepository.remove(entry);
  }
}
