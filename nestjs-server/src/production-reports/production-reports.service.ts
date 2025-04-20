import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ProductionReport } from './entities/production-report.entity';
import { ProductionMaterial } from 'src/production-materials/entities/production-material.entity';
import { CreateProductionReportDto } from './dto/create-production-report.dto';
import { RawStorage } from 'src/raw-storage/entities/raw-storage.entity';
import { ProductStorage } from 'src/product-storage/entities/product-storage.entity';
import { Product } from 'src/products/entities/product.entity';
import { Staff } from 'src/staff/entities/staff.entity';


@Injectable()
export class ProductionReportsService {
  constructor(
    @InjectRepository(ProductionReport)
    private productionReportRepo: Repository<ProductionReport>,

    @InjectRepository(ProductionMaterial)
    private productionMaterialRepo: Repository<ProductionMaterial>,

    @InjectRepository(RawStorage)
    private rawStorageRepo: Repository<RawStorage>,

    @InjectRepository(ProductStorage)
    private productStorageRepo: Repository<ProductStorage>,

    private dataSource: DataSource,
  ) {}

  async create(createDto: CreateProductionReportDto): Promise<ProductionReport> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {
      // 1. Проверка наличия и вычитание материалов
      for (const item of createDto.materials) {
        const storage = await queryRunner.manager.findOne(RawStorage, {
          where: { raw_material: { id: item.raw_material_id } },
          relations: ['raw_material'],
        });
  
        if (!storage) {
          throw new NotFoundException(`Сырьё с ID ${item.raw_material_id} не найдено на складе`);
        }
  
        if (storage.quantity < item.quantity) {
          throw new BadRequestException(`Недостаточно сырья ${storage.raw_material.name} на складе`);
        }
  
        storage.quantity -= item.quantity;
        await queryRunner.manager.save(storage);
      }
  
      // 2. Получение связанных сущностей: product и responsible
      const product = await queryRunner.manager.findOne(Product, {
        where: { id: createDto.product_id },
      });
  
      const responsible = await queryRunner.manager.findOne(Staff, {
        where: { id: createDto.responsible_id },
      });
  
      if (!product) {
        throw new NotFoundException(`Продукт с ID ${createDto.product_id} не найден`);
      }
  
      if (!responsible) {
        throw new NotFoundException(`Ответственное лицо с ID ${createDto.responsible_id} не найдено`);
      }
  
      // 3. Создание отчёта
      const report = this.productionReportRepo.create({
        product,
        quantity: createDto.quantity,
        responsible,
        date: new Date(),
      });
  
      const savedReport = await queryRunner.manager.save(report);
  
      // 4. Сохранение использованных материалов
      for (const item of createDto.materials) {
        const material = this.productionMaterialRepo.create({
          rawMaterial: { id: item.raw_material_id },  // Обновляем на использование объекта, а не ID
          quantity: item.quantity,
          productionReport: savedReport,  // Обновляем на использование объекта, а не ID
        });
        await queryRunner.manager.save(material);
      }
  
      // 5. Обновление product_storage
      let productStorage = await queryRunner.manager.findOne(ProductStorage, {
        where: { product: { id: createDto.product_id } },
        relations: ['product'],
      });
  
      if (!productStorage) {
        // если продукта нет на складе — создать запись
        productStorage = this.productStorageRepo.create({
          product,
          quantity: createDto.quantity,
        });
      } else {
        productStorage.quantity += createDto.quantity;
      }
  
      await queryRunner.manager.save(productStorage);
  
      await queryRunner.commitTransaction();
      return savedReport;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
  
  findAll(): Promise<ProductionReport[]> {
    return this.productionReportRepo.find({
      relations: ['product', 'responsible', 'materials', 'materials.rawMaterial'],
    });
  }  

async getProductionCost(reportId: string): Promise<{ totalCost: number, costPerUnit: number }> {
  const report = await this.productionReportRepo.findOne({
    where: { id: reportId },
    relations: ['product'],
  });

  if (!report) {
    throw new NotFoundException(`Report with id ${reportId} not found`);
  }

  const materials = await this.productionMaterialRepo.find({
    where: { productionReport: { id: reportId } },
    relations: ['rawMaterial'],
  });

  const totalCost = materials.reduce((sum, material) => {
    return sum + material.quantity * material.rawMaterial.price;
  }, 0);

  const costPerUnit = report.quantity > 0 ? totalCost / report.quantity : 0;

  return {
    totalCost,
    costPerUnit,
  };
}

  async findOne(id: string): Promise<ProductionReport> {
    const report = await this.productionReportRepo.findOne({
      where: { id },
      relations: ['product', 'responsible', 'materials', 'materials.rawMaterial'],
    });
  
    if (!report) {
      throw new NotFoundException(`Производственный отчёт с ID ${id} не найден`);
    }
  
    return report;
  }
  async remove(id: string): Promise<void> {
    const report = await this.productionReportRepo.findOne({
      where: { id },
      relations: ['materials'],
    });
  
    if (!report) {
      throw new NotFoundException(`Производственный отчёт с ID ${id} не найден`);
    }
  
    await this.productionMaterialRepo.remove(report.materials);
    await this.productionReportRepo.remove(report);             
  }
}
