import { Module } from '@nestjs/common';
import { ProductStorageService } from './product-storage.service';
import { ProductStorageController } from './product-storage.controller';

@Module({
  controllers: [ProductStorageController],
  providers: [ProductStorageService],
})
export class ProductStorageModule {}
