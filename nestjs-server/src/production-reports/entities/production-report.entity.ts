import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { Product } from 'src/products/entities/product.entity';
  import { Staff } from 'src/staff/entities/staff.entity';
  import { ProductionMaterial } from 'src/production-materials/entities/production-material.entity';
  
  @Entity('production_reports')
  export class ProductionReport {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'timestamptz' })
    date: Date;
  
    @Column()
    quantity: number;
  
    @ManyToOne(() => Product)
    product: Product;
  
    @ManyToOne(() => Staff)
    responsible: Staff;

    @OneToMany(() => ProductionMaterial, pm => pm.productionReport)
    materials: ProductionMaterial[];
  }
  