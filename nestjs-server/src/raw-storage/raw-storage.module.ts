import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RawStorageService } from "./raw-storage.service";
import { RawStorageController } from "./raw-storage.controller";
import { RawStorage } from "./entities/raw-storage.entity";
import { RawMaterial } from "src/raw-materials/entities/raw-material.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RawStorage, RawMaterial])],
  controllers: [RawStorageController],
  providers: [RawStorageService],
})
export class RawStorageModule {}
