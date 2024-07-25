import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {Collections, DatabaseService} from '../database/database.service';
import {CreatePantryDto} from './dto/create-pantry.dto';
import {AddProductToPantryDto} from "./dto/add-product.dto";
import {RemoveProductFromPantryDto} from "./dto/remove-product.dto";
import {PantryDetailedDto} from "./dto/pantryDetailed.dto";
import {PantryDto} from "./dto/pantry.dto";
import {Product} from "../product/schemas/product.schema";
import {AgribalyseData, EcoscoreData, NutrimentsData, ProductDto} from "../product/dto/product.dto";
import {plainToClass} from "class-transformer";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";
import {mapProductData} from "./utils/mapProductData";

@Injectable()
export class PantryService {
  private readonly collectionName = 'pantries';

  constructor(
    private readonly dbService: DatabaseService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }

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
    const pantry = await this.dbService.find(Collections.PANTRIES, {_id: pantryId, userId});
    if (!pantry || pantry.length === 0) {
      throw new NotFoundException('Pantry not found');
    }

    const pantryDoc = pantry[0];
    // Aggiungi il barcode del prodotto alla pantry se non è già presente
    if (!pantryDoc.products.includes(addProductToPantryDto.code)) {
      pantryDoc.products.push(addProductToPantryDto.code);
      await this.dbService.update(Collections.PANTRIES, {_id: pantryId}, {products: pantryDoc.products});
    }

    return pantryDoc;
  }

  async removeProductFromPantry(removeProductFromPantryDto: RemoveProductFromPantryDto, userId: string, pantryId: string): Promise<any> {
    const query = {_id: pantryId, userId: userId};
    const update = {$pull: {products: removeProductFromPantryDto.code}};
    return this.dbService.update(<Collections>this.collectionName, query, update);
  }

  async getPantryByCode(userId: string, pantryId: string): Promise<any> {
    const query = {_id: pantryId, userId: userId};
    const response = await this.dbService.findOne(<Collections>this.collectionName, query);
    if (!response) {
      throw new NotFoundException('Pantry not found');
    }
    return response;
  }

  async getDetailedPantryByCode(userId: string, pantryId: string): Promise<PantryDetailedDto> {
    try {
      const cacheKey = `pantry:${userId}:${pantryId}`;
      const pantryDetailedFromCache: PantryDetailedDto = await this.cacheManager.get(cacheKey);
      if (pantryDetailedFromCache) {
        return pantryDetailedFromCache;
      }
      const query = {_id: pantryId, userId: userId};
      const pantryPromise = this.dbService.findOne<PantryDto>(Collections.PANTRIES, query);

      // Using Promise.all to fetch both pantry and products in parallel
      const [pantry, rawProducts] = await Promise.all([
        pantryPromise,
        pantryPromise.then(pantry =>
          pantry ? this.dbService.findManyByCodes<ProductDto>(Collections.PRODUCTS, pantry.products) : []
        )
      ]);

      if (!pantry) {
        throw new NotFoundException('Pantry not found');
      }

      const products: ProductDto[] = await mapProductData(rawProducts);
      const pantryDetailed = {
        name: pantry.name,
        description: pantry.description,
        products: products
      };
      await this.cacheManager.set(cacheKey, pantryDetailed, parseInt(process.env.CACHE_TTL));
      return pantryDetailed;
    } catch (error) {
      console.log("Error in pantry details");
    }

  }

}