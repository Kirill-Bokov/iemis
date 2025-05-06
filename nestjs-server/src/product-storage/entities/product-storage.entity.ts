import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Product } from "src/products/entities/product.entity";

@Entity("product_storage")
export class ProductStorage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column({ name: "quantity" })
  quantity: number;

  @CreateDateColumn({ name: "date_of_receipt" })
  dateOfReceipt: Date;
}
