import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RawMaterial } from 'src/raw-materials/entities/raw-material.entity';

@Entity('raw_storage')
export class RawStorage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => RawMaterial)
  @JoinColumn({ name: 'raw_material_id' })
  raw_material: RawMaterial;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'date_of_receipt', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  date_of_receipt: Date;
  
}
