import { IsNumber } from 'class-validator';

export class CreateProductStorageDto {
  @IsNumber()
  product_id: number;

  @IsNumber()
  quantity: number;
}
