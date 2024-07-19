import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenfoodModule } from './openfood/openfood.module';
import { DatabaseModule } from './database/database.module';
import { CacheModule } from '@nestjs/cache-manager';
import {CacheManagementModule} from "./cache/cache.module";

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: 'memory', // Puoi configurare qui il tipo di store (es. 'redis')
      ttl: 600, // Tempo di vita della cache in secondi
    }),
    DatabaseModule,
    OpenfoodModule,
    CacheManagementModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}