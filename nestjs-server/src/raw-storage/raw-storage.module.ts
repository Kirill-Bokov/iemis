import { Module } from '@nestjs/common';
import { RawStorageService } from './raw-storage.service';
import { RawStorageController } from './raw-storage.controller';

@Module({
  controllers: [RawStorageController],
  providers: [RawStorageService],
})
export class RawStorageModule {}
