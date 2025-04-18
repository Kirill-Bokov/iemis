import { Injectable } from '@nestjs/common';
import { CreateProductionMaterialDto } from './dto/create-production-material.dto';
import { UpdateProductionMaterialDto } from './dto/update-production-material.dto';

@Injectable()
export class ProductionMaterialsService {
  create(createProductionMaterialDto: CreateProductionMaterialDto) {
    return 'This action adds a new productionMaterial';
  }

  findAll() {
    return `This action returns all productionMaterials`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productionMaterial`;
  }

  update(id: number, updateProductionMaterialDto: UpdateProductionMaterialDto) {
    return `This action updates a #${id} productionMaterial`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionMaterial`;
  }
}
