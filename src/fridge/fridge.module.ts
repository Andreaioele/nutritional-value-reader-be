import { Module } from '@nestjs/common';
import { FridgeController } from './fridge.controller';
import { FridgeService } from './fridge.service';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [FridgeController],
  providers: [FridgeService, DatabaseService],
})
export class FridgeModule {}