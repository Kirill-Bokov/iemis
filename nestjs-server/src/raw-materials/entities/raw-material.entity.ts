import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('raw_material')
export class RawMaterial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  measure: string;
}