import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  create(createStaffDto: CreateStaffDto) {
    console.log(createStaffDto)
    const staff = this.staffRepository.create(createStaffDto);
    return this.staffRepository.save(staff);
  }

  findAll() {
    return this.staffRepository.find();
  }

  findOne(id: string) {
    return this.staffRepository.findOneBy({ id });
  }

  update(id: string, updateStaffDto: UpdateStaffDto) {
    return this.staffRepository.update(id, updateStaffDto);
  }

  remove(id: string) {
    return this.staffRepository.delete(id);
  }
}
