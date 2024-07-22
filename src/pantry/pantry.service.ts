import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreatePantryDto } from './dto/Pantry.dto';

@Injectable()
export class PantryService {
  private readonly collectionName = 'pantrys';

  constructor(private readonly dbService: DatabaseService) {}

  async createPantry(createPantryDto: CreatePantryDto): Promise<any> {
    const pantry = {
      userId: createPantryDto.userId,
      name: createPantryDto.name,
      products: [],
    };
    return this.dbService.insert(this.collectionName, pantry);
  }

  // Implement other methods like deletePantry, addProduct, removeProduct
}