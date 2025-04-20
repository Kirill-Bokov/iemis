import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
  } from 'typeorm';
  import { RawMaterial } from 'src/raw-materials/entities/raw-material.entity';
  import { ProductionReport } from 'src/production-reports/entities/production-report.entity';
  
  @Entity('production_materials')
  export class ProductionMaterial {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => RawMaterial)
    rawMaterial: RawMaterial;
  
    @ManyToOne(() => ProductionReport, report => report.materials)
    productionReport: ProductionReport;
  
    @Column()
    quantity: number;
  }