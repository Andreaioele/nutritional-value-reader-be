import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenfoodModule } from './openfood/openfood.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    OpenfoodModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}