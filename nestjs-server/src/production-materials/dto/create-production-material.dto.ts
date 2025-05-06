import { IsNumber } from 'class-validator';

export class CreateProductionMaterialDto {
  @IsNumber()
  production_report_id: number;

  @IsNumber()
  raw_material_id: number;

  @IsNumber()
  quantity: number;
}
