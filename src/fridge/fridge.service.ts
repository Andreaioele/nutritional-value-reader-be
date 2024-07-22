import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateFridgeDto } from './dto/Fridge.dto';

@Injectable()
export class FridgeService {
  private readonly collectionName = 'fridges';

  constructor(private readonly dbService: DatabaseService) {}

  async createFridge(createFridgeDto: CreateFridgeDto): Promise<any> {
    const fridge = {
      userId: createFridgeDto.userId,
      name: createFridgeDto.name,
      products: [],
    };
    return this.dbService.insert(this.collectionName, fridge);
  }

  // Implement other methods like deleteFridge, addProduct, removeProduct
}