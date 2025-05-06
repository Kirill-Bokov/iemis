import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(createProductDto);
    return await this.productRepo.save(product);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Продукт с ID ${id} не найден`);
    }

    const updated = this.productRepo.merge(product, updateProductDto);
    return await this.productRepo.save(updated);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepo.find();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Продукт с ID ${id} не найден`);
    }

    return product;
  }

  async remove(id: string): Promise<void> {
    const product = await this.productRepo.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Продукт с ID ${id} не найден`);
    }

    await this.productRepo.remove(product);
  }
}

