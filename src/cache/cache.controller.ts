import {
  Controller,
  Post,
  Res,
  HttpStatus,
  InternalServerErrorException, Get, Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { CacheManagementService } from './cache.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {DatabaseService} from "../database/database.service";
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from "@nestjs/cache-manager"

@Controller('cache')
export class CacheManagementController {
  constructor(
    private readonly cacheService: CacheManagementService,
    @Inject(CACHE_MANAGER) public cacheManager: Cache) {}

  /**
   * @description
   * Clears the cache.
   * This endpoint clears the entire cache.
   * @route POST /cache/clear
   * @returns {Promise<void>} - No content
   */
  @ApiTags('Cache')
  @ApiOperation({
    summary: 'This endpoint clears the entire cache',
  })
  @ApiResponse({
    status: 204,
    description: 'Cache purged',
    isArray: false,
  })
  @Post('/clear')
  async clearCache(@Res() res: Response): Promise<void> {
    try {
      await this.cacheService.clearCache();
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      throw new InternalServerErrorException(
        `Error clearing cache: ${error.message}`,
      );
    }
  }
  @Get('get-all-data')
  async getData() {
    //Get all keys
    const keys = await this.cacheManager.store.keys();

    //Loop through keys and get data
    const allData: { [key: string]: any } = {};
    for (const key of keys) {
      allData[key] = await this.cacheManager.get(key);
    }
    return allData;
  }
}
