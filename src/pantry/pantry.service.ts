import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {Collections, DatabaseService} from '../database/database.service';
import {CreatePantryDto} from './dto/create-pantry.dto';
import {AddProductToPantryDto} from "./dto/add-product.dto";
import {RemoveProductFromPantryDto} from "./dto/remove-product.dto";
import {PantryDetailedDto} from "./dto/pantryDetailed.dto";
import {PantryDto} from "./dto/pantry.dto";
import {Product} from "../product/schemas/product.schema";
import {Agribalyse, EcoscoreData, ProductDto} from "../product/dto/product.dto";
import {plainToClass} from "class-transformer";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";

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
          pantry ? this.dbService.findManyByCodes(Collections.PRODUCTS, pantry.products) : []
        )
      ]);

      if (!pantry) {
        throw new NotFoundException('Pantry not found');
      }

      const products: ProductDto[] = rawProducts.map(data => this.mapToProductDto(data._doc));

      const pantryDetailed = {
        name: pantry.name,
        description: pantry.description,
        products: products
      };
      await this.cacheManager.set(cacheKey, pantryDetailed, parseInt(process.env.CACHE_TTL));
      return pantryDetailed;
    } catch (error) {
      console.log("error pantry");
    }

  }

  mapToProductDto(data: any): ProductDto {
    const agribalyse = this.mapToAgribalyse(data);
    const ecoscoreData = this.mapToEcoscoreData(data, agribalyse);

    return plainToClass(ProductDto, {
      _id: data._id,
      _keywords: data._keywords,
      added_countries_tags: data.added_countries_tags,
      allergens_tags: data.allergens_tags,
      brands: data.brands,
      brands_tags: data.brands_tags,
      categories: data.categories,
      categories_lc: data.categories_lc,
      categories_tags: data.categories_tags,
      code: data.code,
      countries_tags: data.countries_tags,
      created_t: data.created_t,
      data_quality_warnings_tags: data.data_quality_warnings_tags,
      ecoscore_data: ecoscoreData,
      ecoscore_extended_data: data.ecoscore_extended_data,
      ecoscore_grade: data.ecoscore_grade,
      ecoscore_score: data.ecoscore_score,
      emb_codes: data.emb_codes,
      generic_name: data.generic_name,
      generic_name_en: data.generic_name_en,
      generic_name_it: data.generic_name_it,
      generic_name_pl: data.generic_name_pl,
      id: data.id,
      image_front_small_url: data.image_front_small_url,
      image_front_thumb_url: data.image_front_thumb_url,
      image_front_url: data.image_front_url,
      image_ingredients_small_url: data.image_ingredients_small_url,
      image_ingredients_thumb_url: data.image_ingredients_thumb_url,
      image_ingredients_url: data.image_ingredients_url,
      image_nutrition_small_url: data.image_nutrition_small_url,
      image_nutrition_thumb_url: data.image_nutrition_thumb_url,
      image_nutrition_url: data.image_nutrition_url,
      serving_quantity: data.serving_quantity,
      serving_size: data.serving_size,
      stores: data.stores,
      stores_tags: data.stores_tags,
      traces: data.traces,
      traces_from_ingredients: data.traces_from_ingredients,
      traces_from_user: data.traces_from_user,
      traces_hierarchy: data.traces_hierarchy,
      traces_lc: data.traces_lc,
      traces_tags: data.traces_tags,
      unique_scans_n: data.unique_scans_n,
      unknown_ingredients_n: data.unknown_ingredients_n,
      unknown_nutrients_tags: data.unknown_nutrients_tags,
      update_key: data.update_key,
      vitamins_tags: data.vitamins_tags,
    });
  }

  mapToAgribalyse(data: any): Agribalyse {
    return plainToClass(Agribalyse, {
      agribalyse_food_code: data.agribalyse_food_code,
      co2_agriculture: data.co2_agriculture,
      co2_consumption: data.co2_consumption,
      co2_distribution: data.co2_distribution,
      co2_packaging: data.co2_packaging,
      co2_processing: data.co2_processing,
      co2_total: data.co2_total,
      co2_transportation: data.co2_transportation,
      dqr: data.dqr,
      ef_agriculture: data.ef_agriculture,
      ef_consumption: data.ef_consumption,
      ef_distribution: data.ef_distribution,
      ef_packaging: data.ef_packaging,
      ef_processing: data.ef_processing,
      ef_total: data.ef_total,
      ef_transportation: data.ef_transportation,
      is_beverage: data.is_beverage,
      name_en: data.name_en,
      name_fr: data.name_fr,
      score: data.score,
      version: data.version,
    });
  }

  mapToEcoscoreData(data: any, agribalyse: Agribalyse): EcoscoreData {
    return plainToClass(EcoscoreData, {
      agribalyse: agribalyse,
      grade: data.grade,
      grades: data.grades,
      previous_data: data.previous_data,
      score: data.ecoscore_score,
      scores: data.scores,
      status: data.status,
    });
  }
}