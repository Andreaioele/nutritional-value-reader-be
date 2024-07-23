import { Injectable } from '@nestjs/common';
import {Collections, DatabaseService} from '../database/database.service';
import { CreatePantryDto } from './dto/Pantry.dto';

@Injectable()
export class PantryService {
  private readonly collectionName = 'pantrys';

  constructor(private readonly dbService: DatabaseService) {}

  async createPantry(createPantryDto: CreatePantryDto, userId: string): Promise<any> {
    const pantry = {
      userId: userId,
      name: createPantryDto.name,
      description: createPantryDto.description,
      products: [],
    };
    return this.dbService.insert(<Collections>this.collectionName, pantry);
  }

  // Implement other methods like deletePantry, addProduct, removeProduct
}