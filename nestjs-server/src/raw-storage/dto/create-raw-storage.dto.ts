import { IsUUID, IsInt} from 'class-validator';

export class CreateRawStorageDto {
  @IsInt()
  quantity: number;

  @IsUUID()
  raw_material_id: string;
}
