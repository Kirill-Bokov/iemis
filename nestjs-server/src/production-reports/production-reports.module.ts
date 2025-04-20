import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionReport } from './entities/production-report.entity';
import { ProductionReportsService } from './production-reports.service';
import { ProductionReportsController } from './production-reports.controller';

import { ProductionMaterial } from 'src/production-materials/entities/production-material.entity';
import { RawStorage } from 'src/raw-storage/entities/raw-storage.entity';
import { ProductStorage } from 'src/product-storage/entities/product-storage.entity';
import { RawMaterial } from 'src/raw-materials/entities/raw-material.entity';
import { Product } from 'src/products/entities/product.entity';
import { Staff } from 'src/staff/entities/staff.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductionReport,
      ProductionMaterial,
      RawStorage,
      ProductStorage,
      RawMaterial,
      Product,
      Staff,
    ]),
  ],
  controllers: [ProductionReportsController],
  providers: [ProductionReportsService],
})
export class ProductionReportsModule {}
