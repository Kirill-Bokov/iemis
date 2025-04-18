import { PartialType } from '@nestjs/mapped-types';
import { CreateProductionReportDto } from './create-production-report.dto';

export class UpdateProductionReportDto extends PartialType(CreateProductionReportDto) {}
