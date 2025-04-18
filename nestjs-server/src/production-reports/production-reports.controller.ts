import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductionReportsService } from './production-reports.service';
import { CreateProductionReportDto } from './dto/create-production-report.dto';
import { UpdateProductionReportDto } from './dto/update-production-report.dto';

@Controller('production-reports')
export class ProductionReportsController {
  constructor(private readonly productionReportsService: ProductionReportsService) {}

  @Post()
  create(@Body() createProductionReportDto: CreateProductionReportDto) {
    return this.productionReportsService.create(createProductionReportDto);
  }

  @Get()
  findAll() {
    return this.productionReportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionReportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductionReportDto: UpdateProductionReportDto) {
    return this.productionReportsService.update(+id, updateProductionReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionReportsService.remove(+id);
  }
}
