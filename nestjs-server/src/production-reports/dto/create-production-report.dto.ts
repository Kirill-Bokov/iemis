export class CreateProductionReportDto {
    product_id: string;
    quantity: number;
    responsible_id: string;
    materials: {
      raw_material_id: string;
      quantity: number;
    }[];
  }