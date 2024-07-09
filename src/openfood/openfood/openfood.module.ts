import { Module } from '@nestjs/common';
import {OpenfoodController} from "./openfood.controller";
import {OpenfoodService} from "./openfood.service";

@Module({
  imports: [],
  controllers: [OpenfoodController],
  providers: [OpenfoodService],
})
export class OpenfoodModule {}
