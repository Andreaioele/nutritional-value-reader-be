import { Module } from '@nestjs/common';
import { PantryController } from './pantry.controller';
import { PantryService } from './pantry.service';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [PantryController],
  providers: [PantryService, DatabaseService],
})
export class PantryModule {}