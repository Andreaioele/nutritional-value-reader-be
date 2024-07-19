import { Module } from '@nestjs/common';
import {OpenfoodController} from "./openfood.controller";
import {OpenfoodService} from "./openfood.service";
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [OpenfoodController],
  providers: [OpenfoodService],
})
export class OpenfoodModule {}
