import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Product } from "src/products/entities/product.entity";
import { Staff } from "src/staff/entities/staff.entity";
import { ProductionMaterial } from "src/production-materials/entities/production-material.entity";

@Entity("production_reports")
export class ProductionReport {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @Column({ name: "quantity" })
  quantity: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(() => Staff)
  @JoinColumn({ name: "responsible_id" })
  responsible: Staff;

  @OneToMany(() => ProductionMaterial, (pm) => pm.productionReport, {
    eager: true,
  })
  materials: ProductionMaterial[];
}
