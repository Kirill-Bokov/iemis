import { IsString, IsNumber } from "class-validator";

export class CreateRawMaterialDto {
  @IsString()
  name: string;
  
  @IsNumber()
  price: number;

  @IsString()
  measure: string;
}
