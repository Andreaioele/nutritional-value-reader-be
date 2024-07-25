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
    const nutriments = this.mapToNutrimentsData(data);

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
      ecoscore_data: ecoscoreData,
      ecoscore_extended_data: data.ecoscore_extended_data,
      ecoscore_grade: data.ecoscore_grade,
      ecoscore_score: data.ecoscore_score,
      emb_codes: data.emb_codes,
      generic_name: data.generic_name,
      generic_name_en: data.generic_name_en,
      generic_name_it: data.generic_name_it,
      ingredients_text: data.ingredients_text,
      ingredients_text_en: data.ingredients_text_en,
      ingredients_text_it: data.ingredients_text_it,
      ingredients_text_with_allergens: data.ingredients_text_with_allergens,
      ingredients_text_with_allergens_it: data.ingredients_text_with_allergens_it,
      labels: data.labels,
      labels_hierarchy: data.labels_hierarchy,
      labels_lc: data.labels_lc,
      labels_tags: data.labels_tags,
      lang: data.lang,
      nutrient_levels: data.nutrient_levels,
      nutrient_levels_tags: data.nutrient_levels_tags,
      nutriments: nutriments,
      nutriscore: data.nutriscore,
      packaging: data.packaging,
      packaging_lc: data.packaging_lc,
      packaging_recycling_tags: data.packaging_recycling_tags,
      pnns_groups_1: data.pnns_groups_1,
      pnns_groups_1_tags: data.pnns_groups_1_tags,
      pnns_groups_2: data.pnns_groups_2,
      pnns_groups_2_tags: data.pnns_groups_2_tags,
      popularity_key: data.popularity_key,
      popularity_tags: data.popularity_tags,
      product_name: data.product_name,
      product_name_en: data.product_name_en,
      product_name_it: data.product_name_it,
      product_quantity: data.product_quantity,
      quantity: data.quantity,
      selected_images: data.selected_images,
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

  mapToAgribalyse(data: any): AgribalyseData {
    return plainToClass(AgribalyseData, {
      agribalyse_food_code: data.agribalyse_food_code,
      co2_agriculture: data.co2_agriculture,
      co2_consumption: data.co2_consumption,
      co2_distribution: data.co2_distribution,
      co2_packaging: data.co2_packaging,
      co2_processing: data.co2_processing,
      co2_total: data.co2_total,
      co2_transportation: data.co2_transportation,
      code: data.code,
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

  mapToEcoscoreData(data: any, agribalyse: AgribalyseData): EcoscoreData {
    return plainToClass(EcoscoreData, {
      agribalyse: agribalyse,
      grade: data.grade,
      grades: data.grades,
      score: data.ecoscore_score,
      scores: data.scores,
      status: data.status,
    });
  }

  mapToNutrimentsData(data: any): NutrimentsData {
    return plainToClass(NutrimentsData, {
      carbohydrates: data.nutriments.carbohydrates,
      carbohydrates_100g: data.nutriments.carbohydrates_100g,
      carbohydrates_serving: data.nutriments.carbohydrates_serving,
      carbohydrates_unit: data.nutriments.carbohydrates_unit,
      carbohydrates_value: data.nutriments.carbohydrates_value,
      energy: data.nutriments.energy,
      energy_kcal: data.nutriments['energy-kcal'],
      energy_kcal_100g: data.nutriments['energy-kcal_100g'],
      energy_kcal_serving: data.nutriments['energy-kcal_serving'],
      energy_kcal_unit: data.nutriments['energy-kcal_unit'],
      energy_kcal_value: data.nutriments['energy-kcal_value'],
      energy_kcal_value_computed: data.nutriments['energy-kcal_value_computed'],
      fat: data.nutriments.fat,
      fat_100g: data.nutriments.fat_100g,
      fat_serving: data.nutriments.fat_serving,
      fat_unit: data.nutriments.fat_unit,
      fat_value: data.nutriments.fat_value,
      fiber: data.nutriments.fiber,
      fiber_100g: data.nutriments.fiber_100g,
      fiber_serving: data.nutriments.fiber_serving,
      fiber_unit: data.nutriments.fiber_unit,
      fiber_value: data.nutriments.fiber_value,
      nuova_group: data.nutriments['nova-group'],
      nova_group_100g: data.nutriments['nova-group_100g'],
      nova_group_serving: data.nutriments['nova-group_serving'],
      nutrition_score_fr: data.nutriments['nutrition-score-fr'],
      nutrition_score_fr_100g: data.nutriments['nutrition-score-fr_100g'],
      proteins: data.nutriments.proteins,
      proteins_100g: data.nutriments.proteins_100g,
      proteins_serving: data.nutriments.proteins_serving,
      proteins_unit: data.nutriments.proteins_unit,
      proteins_value: data.nutriments.proteins_value,
      salt: data.nutriments.salt,
      salt_100g: data.nutriments.salt_100g,
      salt_serving: data.nutriments.salt_serving,
      salt_unit: data.nutriments.salt_unit,
      salt_value: data.nutriments.salt_value,
      saturated_fat: data.nutriments['saturated-fat'],
      saturated_fat_100g: data.nutriments['saturated-fat_100g'],
      saturated_fat_serving: data.nutriments['saturated-fat_serving'],
      saturated_fat_unit: data.nutriments['saturated-fat_unit'],
      saturated_fat_value: data.nutriments['saturated-fat_value'],
      sodium: data.nutriments.sodium,
      sodium_100g: data.nutriments.sodium_100g,
      sodium_serving: data.nutriments.sodium_serving,
      sodium_unit: data.nutriments.sodium_unit,
      sodium_value: data.nutriments.sodium_value,
      sugars: data.nutriments.sugars,
      sugars_100g: data.nutriments.sugars_100g,
      sugars_serving: data.nutriments.sugars_serving,
      sugars_unit: data.nutriments.sugars_unit,
      sugars_value: data.nutriments.sugars_value,
    });
  }
}