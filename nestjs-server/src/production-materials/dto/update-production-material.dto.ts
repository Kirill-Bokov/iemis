import { PartialType } from '@nestjs/mapped-types';
import { CreateProductionMaterialDto } from './create-production-material.dto';

export class UpdateProductionMaterialDto extends PartialType(CreateProductionMaterialDto) {}
