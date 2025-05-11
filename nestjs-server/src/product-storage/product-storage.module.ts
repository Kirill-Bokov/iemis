import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductStorageService } from './product-storage.service'
import { ProductStorageController } from './product-storage.controller'
import { ProductStorage } from './entities/product-storage.entity'
import { Product } from 'src/products/entities/product.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ProductStorage, Product])],
  controllers: [ProductStorageController],
  providers: [ProductStorageService],
})
export class ProductStorageModule {}
