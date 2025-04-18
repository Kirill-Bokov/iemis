import { Module } from '@nestjs/common';
import { ProductionReportsService } from './production-reports.service';
import { ProductionReportsController } from './production-reports.controller';

@Module({
  controllers: [ProductionReportsController],
  providers: [ProductionReportsService],
})
export class ProductionReportsModule {}
