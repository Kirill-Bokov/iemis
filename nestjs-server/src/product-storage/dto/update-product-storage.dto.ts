import { PartialType } from '@nestjs/mapped-types';
import { CreateProductStorageDto } from './create-product-storage.dto';

export class UpdateProductStorageDto extends PartialType(CreateProductStorageDto) {}
