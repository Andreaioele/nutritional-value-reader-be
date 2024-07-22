import { Module } from '@nestjs/common';
import { PantryController } from './pantry.controller';
import { PantryService } from './pantry.service';
import { DatabaseService } from '../database/database.service';
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [PantryController],
  providers: [PantryService],
})
export class PantryModule {}