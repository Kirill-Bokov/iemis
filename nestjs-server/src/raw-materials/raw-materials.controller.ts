import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { RawMaterialService } from './raw-materials.service';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';

@Controller('raw-material')
export class RawMaterialController {
  constructor(private readonly rawMaterialService: RawMaterialService) {}

  @Post()
  async create(@Body() dto: CreateRawMaterialDto) {
    return this.rawMaterialService.create(dto);
  }

  @Get()
  async findAll() {
    return this.rawMaterialService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.rawMaterialService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateRawMaterialDto) {
    return this.rawMaterialService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.rawMaterialService.remove(id);
  }
}
