import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
  } from 'typeorm';
  import { RawMaterial } from 'src/raw-materials/entities/raw-material.entity';
  import { ProductionReport } from 'src/production-reports/entities/production-report.entity';
  
  @Entity('production_materials')
  export class ProductionMaterial {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => RawMaterial, { eager: true })
    @JoinColumn({ name: 'raw_material_id' })  
    rawMaterial: RawMaterial;
  
    @ManyToOne(() => ProductionReport, (report) => report.materials)
    @JoinColumn({ name: 'production_report_id' })
    productionReport: ProductionReport;    
  
    @Column()
    quantity: number;
  }
  