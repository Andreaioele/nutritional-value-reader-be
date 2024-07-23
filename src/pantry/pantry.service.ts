import {Injectable, NotFoundException} from '@nestjs/common';
import {Collections, DatabaseService} from '../database/database.service';
import { CreatePantryDto } from './dto/create-pantry.dto';
import {AddProductToPantryDto} from "./dto/add-product.dto";
import {RemoveProductFromPantryDto} from "./dto/remove-product.dto";

@Injectable()
export class PantryService {
  private readonly collectionName = 'pantries';

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
  async addProductToPantry(addProductToPantryDto: AddProductToPantryDto, userId: string, pantryId: string): Promise<any> {
    // Trova la pantry
    const pantry = await this.dbService.find(Collections.PANTRIES, { _id: pantryId, userId });
    if (!pantry || pantry.length === 0) {
      throw new NotFoundException('Pantry not found');
    }

    const pantryDoc = pantry[0];
    // Aggiungi il barcode del prodotto alla pantry se non è già presente
    if (!pantryDoc.products.includes(addProductToPantryDto.code)) {
      pantryDoc.products.push(addProductToPantryDto.code);
      await this.dbService.update(Collections.PANTRIES, { _id: pantryId }, { products: pantryDoc.products });
    }

    return pantryDoc;
  }

  async removeProductFromPantry(removeProductFromPantryDto: RemoveProductFromPantryDto, userId: string, pantryId: string): Promise<any> {
    const query = { _id: pantryId, userId: userId };
    const update = { $pull: { products: removeProductFromPantryDto.code } };
    return this.dbService.update(<Collections>this.collectionName, query, update);
  }
}