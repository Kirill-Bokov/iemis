import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductStorage } from './entities/product-storage.entity'
import { CreateProductStorageDto } from './dto/create-product-storage.dto'
//import { UpdateProductStorageDto } from './dto/update-product-storage.dto'

@Injectable()
export class ProductStorageService {
  constructor(
    @InjectRepository(ProductStorage)
    private readonly productStorageRepository: Repository<ProductStorage>,
  ) {}

  async create(createProductStorageDto: CreateProductStorageDto): Promise<ProductStorage> {
    const storageItem = this.productStorageRepository.create(createProductStorageDto)
    return this.productStorageRepository.save(storageItem)
  }

  async findAll(): Promise<ProductStorage[]> {
    return this.productStorageRepository.find({
      relations: ['product'],
      order: { dateOfReceipt: 'DESC' },
    })
  }

  //async findOne(id: string): Promise<ProductStorage> {
    //return this.productStorageRepository.findOne({
      //where: { id },
      //relations: ['product'],
   // })
  //}

//  async update(id: string, updateProductStorageDto: UpdateProductStorageDto): Promise<ProductStorage> {
//    await this.productStorageRepository.update(id, updateProductStorageDto)
//    return this.findOne(id)
//  }

  async remove(id: string): Promise<void> {
    await this.productStorageRepository.delete(id)
  }
}
