import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { RawMaterial } from 'src/raw-materials/entities/raw-material.entity';

@Entity('raw_storage')
export class RawStorage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => RawMaterial)
  raw_material: RawMaterial;

  @Column()
  quantity: number;

  @Column({ type: 'timestamptz' })
  date_of_receipt: Date;
}