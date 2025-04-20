import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './clients/clients.module';
import { OrdersModule } from './orders/orders.module';
import { PropertyModule } from './property/property.module';
import { StorageModule } from './storage/storage.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { ProductsModule } from './products/products.module';
import { ProductionMaterialsModule } from './production-materials/production-materials.module';
import { ProductionReportsModule } from './production-reports/production-reports.module';
import { StaffModule } from './staff/staff.module';
import { PurchaseItemsModule } from './purchase-items/purchase-items.module';
import { PurchasesModule } from './purchases/purchases.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { RawMaterialsModule } from './raw-materials/raw-materials.module';
import { RawStorageModule } from './raw-storage/raw-storage.module';
import { ProductStorageModule } from './product-storage/product-storage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mLbr%@.-G.890n^]albYUI3#',
      database: 'iemisdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ClientsModule,
    OrdersModule,
    ProductsModule,
    PurchasesModule,
    RawMaterialsModule,
    StaffModule,
    StorageModule,
    SuppliersModule,
    PropertyModule,
    OrderItemsModule,
    ProductionMaterialsModule,
    ProductionReportsModule,
    PurchaseItemsModule,
    RawStorageModule,
    ProductStorageModule,
  ],
})
export class AppModule {}
