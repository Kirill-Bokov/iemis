import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MaterialDto {
  @IsString()
  @IsNotEmpty()
  raw_material_id: string;

  @IsNumber()
  quantity: number;
}

export class CreateProductionReportDto {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsNumber()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  responsible_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MaterialDto)
  materials: MaterialDto[];
}
