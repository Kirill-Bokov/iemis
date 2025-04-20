import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RawStorageService } from './raw-storage.service';
import { CreateRawStorageDto } from './dto/create-raw-storage.dto';
import { UpdateRawStorageDto } from './dto/update-raw-storage.dto';

@Controller('raw-storage')
export class RawStorageController {
  constructor(private readonly rawStorageService: RawStorageService) {}

  @Post()
  create(@Body() createRawStorageDto: CreateRawStorageDto) {
    return this.rawStorageService.create(createRawStorageDto);
  }

  @Get()
  findAll() {
    return this.rawStorageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rawStorageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRawStorageDto: UpdateRawStorageDto) {
    return this.rawStorageService.update(+id, updateRawStorageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rawStorageService.remove(+id);
  }
}
