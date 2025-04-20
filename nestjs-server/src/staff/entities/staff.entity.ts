import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductionReport } from 'src/production-reports/entities/production-report.entity';

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'job_title' })
  jobTitle: string;

  @Column()
  phone: string;

  @OneToMany(() => ProductionReport, report => report.responsible)
  productionReports: ProductionReport[];
}
