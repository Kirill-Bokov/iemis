import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterialService } from './raw-materials.service';
import { RawMaterialController } from './raw-materials.controller';
import { RawMaterial } from './entities/raw-material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RawMaterial])],
  controllers: [RawMaterialController],
  providers: [RawMaterialService],
})
export class RawMaterialModule {}
