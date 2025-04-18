import { Module } from '@nestjs/common';
import { ProductionMaterialsService } from './production-materials.service';
import { ProductionMaterialsController } from './production-materials.controller';

@Module({
  controllers: [ProductionMaterialsController],
  providers: [ProductionMaterialsService],
})
export class ProductionMaterialsModule {}
