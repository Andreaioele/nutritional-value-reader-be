import { Module } from '@nestjs/common';
import { CacheManagementService } from './cache.service';
import { CacheManagementController } from './cache.controller';

@Module({
  controllers: [CacheManagementController],
  providers: [CacheManagementService],
})
export class CacheManagementModule {}
