import { Injectable } from '@nestjs/common';
import { CreateProductionReportDto } from './dto/create-production-report.dto';
import { UpdateProductionReportDto } from './dto/update-production-report.dto';

@Injectable()
export class ProductionReportsService {
  create(createProductionReportDto: CreateProductionReportDto) {
    return 'This action adds a new productionReport';
  }

  findAll() {
    return `This action returns all productionReports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productionReport`;
  }

  update(id: number, updateProductionReportDto: UpdateProductionReportDto) {
    return `This action updates a #${id} productionReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionReport`;
  }
}
