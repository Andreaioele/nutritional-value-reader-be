import {Injectable, Inject, Logger} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheManagementService {
  constructor(@Inject(CACHE_MANAGER) public cacheManager: Cache) {}

  async clearCache(): Promise<void> {
    Logger.debug('Cache cleared');
    await this.cacheManager.reset();
  }
}
