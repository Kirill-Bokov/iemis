import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { ProductionMaterialsModule } from './production-materials/production-materials.module';
import { ProductionReportsModule } from './production-reports/production-reports.module';
import { StaffModule } from './staff/staff.module';
import { RawMaterialModule } from './raw-materials/raw-materials.module';
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
      extra: {
        charset: 'utf8',
      },
    }),
    ProductsModule,
    RawMaterialModule,
    StaffModule,
    ProductionMaterialsModule,
    ProductionReportsModule,
    RawStorageModule,
    ProductStorageModule,
  ],
})
export class AppModule {}
