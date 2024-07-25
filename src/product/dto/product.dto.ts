import {ApiProperty} from '@nestjs/swagger';
import {IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

export class NutrimentsData {
  @ApiProperty({description: 'Carbohydrates in grams'})
  @IsNumber()
  carbohydrates: number;

  @ApiProperty({description: 'Carbohydrates per 100g in grams'})
  @IsNumber()
  carbohydrates_100g: number;

  @ApiProperty({description: 'Carbohydrates per serving in grams'})
  @IsNumber()
  carbohydrates_serving: number;

  @ApiProperty({description: 'Carbohydrates unit', example: 'g'})
  @IsString()
  carbohydrates_unit: string;

  @ApiProperty({description: 'Carbohydrates value in grams'})
  @IsNumber()
  carbohydrates_value: number;

  @ApiProperty({description: 'Energy in kJ'})
  @IsNumber()
  energy: number;

  @ApiProperty({description: 'Energy in kcal'})
  @IsNumber()
  energy_kcal: number;

  @ApiProperty({description: 'Energy per 100g in kcal'})
  @IsNumber()
  energy_kcal_100g: number;

  @ApiProperty({description: 'Energy per serving in kcal'})
  @IsNumber()
  energy_kcal_serving: number;

  @ApiProperty({description: 'Energy unit in kcal', example: 'kcal'})
  @IsString()
  energy_kcal_unit: string;

  @ApiProperty({description: 'Energy value in kcal'})
  @IsNumber()
  energy_kcal_value: number;

  @ApiProperty({description: 'Computed energy value in kcal'})
  @IsNumber()
  energy_kcal_value_computed: number;

  @ApiProperty({description: 'Fat in grams'})
  @IsNumber()
  fat: number;

  @ApiProperty({description: 'Fat per 100g in grams'})
  @IsNumber()
  fat_100g: number;

  @ApiProperty({description: 'Fat per serving in grams'})
  @IsNumber()
  fat_serving: number;

  @ApiProperty({description: 'Fat unit', example: 'g'})
  @IsString()
  fat_unit: string;

  @ApiProperty({description: 'Fat value in grams'})
  @IsNumber()
  fat_value: number;

  @ApiProperty({description: 'Fiber in grams'})
  @IsNumber()
  fiber: number;

  @ApiProperty({description: 'Fiber per 100g in grams'})
  @IsNumber()
  fiber_100g: number;

  @ApiProperty({description: 'Fiber per serving in grams'})
  @IsNumber()
  fiber_serving: number;

  @ApiProperty({description: 'Fiber unit', example: 'g'})
  @IsString()
  fiber_unit: string;

  @ApiProperty({description: 'Fiber value in grams'})
  @IsNumber()
  fiber_value: number;

  @ApiProperty({description: 'Nova group value'})
  @IsNumber()
  nova_group: number;

  @ApiProperty({description: 'Nova group value for 100g'})
  @IsNumber()
  nova_group_100g: number;

  @ApiProperty({description: 'Nova group value for serving'})
  @IsNumber()
  nova_group_serving: number;

  @ApiProperty({description: 'Nutrition score for France'})
  @IsNumber()
  nutrition_score_fr: number;

  @ApiProperty({description: 'Nutrition score for France per 100g'})
  @IsNumber()
  nutrition_score_fr_100g: number;

  @ApiProperty({description: 'Proteins in grams'})
  @IsNumber()
  proteins: number;

  @ApiProperty({description: 'Proteins per 100g in grams'})
  @IsNumber()
  proteins_100g: number;

  @ApiProperty({description: 'Proteins per serving in grams'})
  @IsNumber()
  proteins_serving: number;

  @ApiProperty({description: 'Proteins unit', example: 'g'})
  @IsString()
  proteins_unit: string;

  @ApiProperty({description: 'Proteins value in grams'})
  @IsNumber()
  proteins_value: number;

  @ApiProperty({description: 'Salt in grams'})
  @IsNumber()
  salt: number;

  @ApiProperty({description: 'Salt per 100g in grams'})
  @IsNumber()
  salt_100g: number;

  @ApiProperty({description: 'Salt per serving in grams'})
  @IsNumber()
  salt_serving: number;

  @ApiProperty({description: 'Salt unit', example: 'g'})
  @IsString()
  salt_unit: string;

  @ApiProperty({description: 'Salt value in grams'})
  @IsNumber()
  salt_value: number;

  @ApiProperty({description: 'Saturated fat in grams'})
  @IsNumber()
  saturated_fat: number;

  @ApiProperty({description: 'Saturated fat per 100g in grams'})
  @IsNumber()
  saturated_fat_100g: number;

  @ApiProperty({description: 'Saturated fat per serving in grams'})
  @IsNumber()
  saturated_fat_serving: number;

  @ApiProperty({description: 'Saturated fat unit', example: 'g'})
  @IsString()
  saturated_fat_unit: string;

  @ApiProperty({description: 'Saturated fat value in grams'})
  @IsNumber()
  saturated_fat_value: number;

  @ApiProperty({description: 'Sodium in grams'})
  @IsNumber()
  sodium: number;

  @ApiProperty({description: 'Sodium per 100g in grams'})
  @IsNumber()
  sodium_100g: number;

  @ApiProperty({description: 'Sodium per serving in grams'})
  @IsNumber()
  sodium_serving: number;

  @ApiProperty({description: 'Sodium unit', example: 'g'})
  @IsString()
  sodium_unit: string;

  @ApiProperty({description: 'Sodium value in grams'})
  @IsNumber()
  sodium_value: number;

  @ApiProperty({description: 'Sugars in grams'})
  @IsNumber()
  sugars: number;

  @ApiProperty({description: 'Sugars per 100g in grams'})
  @IsNumber()
  sugars_100g: number;

  @ApiProperty({description: 'Sugars per serving in grams'})
  @IsNumber()
  sugars_serving: number;

  @ApiProperty({description: 'Sugars unit', example: 'g'})
  @IsString()
  sugars_unit: string;

  @ApiProperty({description: 'Sugars value in grams'})
  @IsNumber()
  sugars_value: number;

}

export class AgribalyseData {
  @ApiProperty({description: 'Agribalyse food code'})
  @IsString()
  agribalyse_food_code: string;

  @ApiProperty({description: 'CO2 from agriculture'})
  @IsNumber()
  co2_agriculture: number;

  @ApiProperty({description: 'CO2 from consumption'})
  @IsNumber()
  co2_consumption: number;

  @ApiProperty({description: 'CO2 from distribution'})
  @IsNumber()
  co2_distribution: number;

  @ApiProperty({description: 'CO2 from packaging'})
  @IsNumber()
  co2_packaging: number;

  @ApiProperty({description: 'CO2 from processing'})
  @IsNumber()
  co2_processing: number;

  @ApiProperty({description: 'Total CO2 emissions'})
  @IsNumber()
  co2_total: number;

  @ApiProperty({description: 'CO2 from transportation'})
  @IsNumber()
  co2_transportation: number;

  @ApiProperty({description: 'Code'})
  @IsNumber()
  code: number;

  @ApiProperty({description: 'DQR (Data Quality Rating)'})
  @IsString()
  dqr: string;

  @ApiProperty({description: 'Environmental footprint from agriculture'})
  @IsNumber()
  ef_agriculture: number;

  @ApiProperty({description: 'Environmental footprint from consumption'})
  @IsNumber()
  ef_consumption: number;

  @ApiProperty({description: 'Environmental footprint from distribution'})
  @IsNumber()
  ef_distribution: number;

  @ApiProperty({description: 'Environmental footprint from packaging'})
  @IsNumber()
  ef_packaging: number;

  @ApiProperty({description: 'Environmental footprint from processing'})
  @IsNumber()
  ef_processing: number;

  @ApiProperty({description: 'Total environmental footprint'})
  @IsNumber()
  ef_total: number;

  @ApiProperty({description: 'Environmental footprint from transportation'})
  @IsNumber()
  ef_transportation: number;

  @ApiProperty({description: 'Indicates if the product is a beverage'})
  @IsNumber()
  is_beverage: number;

  @ApiProperty({description: 'Product name in English'})
  @IsString()
  name_en: string;

  @ApiProperty({description: 'Product name in French'})
  @IsString()
  name_fr: string;

  @ApiProperty({description: 'Score'})
  @IsNumber()
  score: number;

  @ApiProperty({description: 'Version'})
  @IsString()
  version: string;
}

export class EcoscoreData {
  @ValidateNested()
  @Type(() => AgribalyseData)
  agrybalyse: AgribalyseData;

  @ApiProperty({description: 'The environmental classification grade.'})
  @IsString()
  grade: string;

  @ApiProperty({description: 'Grades for different categories.'})
  @IsObject()
  grades: object;

  @ApiProperty({description: 'Overall score.'})
  @IsNumber()
  score: number;

  @ApiProperty({description: ''})
  @IsObject()
  scores: object;

  @ApiProperty({description: 'Status of the data.'})
  @IsString()
  status: string;
}

export class ProductDto {
  @ApiProperty({description: 'Product ID'})
  @IsString()
  _id: string;

  @ApiProperty({description: 'Keywords associated with the product', type: [String]})
  @IsArray()
  @IsString({each: true})
  _keywords: string[];

  @ApiProperty({description: 'Tags for added countries', type: [String]})
  @IsArray()
  @IsString({each: true})
  added_countries_tags: string[];

  @ApiProperty({description: 'Tags for allergens', type: [String]})
  @IsArray()
  @IsString({each: true})
  allergens_tags: string[];

  @ApiProperty({description: 'Brands associated with the product'})
  @IsString()
  brands: string;

  @ApiProperty({description: 'Tags for brands', type: [String]})
  @IsArray()
  @IsString({each: true})
  brands_tags: string[];

  @ApiProperty({description: 'Product categories'})
  @IsString()
  categories: string;

  @ApiProperty({description: 'Language code for categories'})
  @IsString()
  categories_lc: string;

  @ApiProperty({description: 'Tags for categories', type: [String]})
  @IsArray()
  @IsString({each: true})
  categories_tags: string[];

  @ApiProperty({description: 'Product code'})
  @IsString()
  code: string;

  @ApiProperty({description: 'Tags for countries', type: [String]})
  @IsArray()
  @IsString({each: true})
  countries_tags: string[];

  @ApiProperty({description: 'Creation timestamp'})
  @IsNumber()
  created_t: number;

  @ApiProperty({description: 'Ecoscore data', type: EcoscoreData})
  @ValidateNested()
  @Type(() => EcoscoreData)
  ecoscore_data: EcoscoreData;

  @ApiProperty({description: 'Extended ecoscore data', type: Object})
  @IsOptional()
  @IsArray()
  ecoscore_extended_data: object;

  @ApiProperty({description: 'Ecoscore grade'})
  @IsString()
  ecoscore_grade: string;

  @ApiProperty({description: 'Ecoscore score'})
  @IsNumber()
  ecoscore_score: number;

  @ApiProperty({description: 'Packaging codes'})
  @IsString()
  emb_codes: string;

  @ApiProperty({description: 'Generic name'})
  @IsString()
  generic_name: string;

  @ApiProperty({description: 'Generic name in English'})
  @IsString()
  generic_name_en: string;

  @ApiProperty({description: 'Generic name in Italian'})
  @IsString()
  generic_name_it: string;

  @ApiProperty({description: 'Generic name in Polish'})
  @IsString()
  generic_name_pl: string;

  @ApiProperty({description: 'Ingredients text'})
  @IsString()
  ingredients_text: string;

  @ApiProperty({description: 'Ingredients text in English'})
  @IsString()
  ingredients_text_en: string;

  @ApiProperty({description: 'Ingredients text in Italian'})
  @IsString()
  ingredients_text_it: string;

  @ApiProperty({description: 'Ingredients text with allergens'})
  @IsString()
  ingredients_text_with_allergens: string;

  @ApiProperty({description: 'Ingredients text with allergens in Italian'})
  @IsString()
  ingredients_text_with_allergens_it: string;

  @ApiProperty({description: 'Labels'})
  @IsString()
  labels: string;

  @ApiProperty({description: 'Labels hierarchy', type: [String]})
  @IsArray()
  @IsString({each: true})
  labels_hierarchy: string[];

  @ApiProperty({description: 'Language code for labels'})
  @IsString()
  labels_lc: string;

  @ApiProperty({description: 'Tags for labels', type: [String]})
  @IsArray()
  @IsString({each: true})
  labels_tags: string[];

  @ApiProperty({description: 'Language'})
  @IsString()
  lang: string;

  @ApiProperty({description: 'Nutrient levels', type: Object})
  @IsOptional()
  @IsArray()
  nutrient_levels: object;

  @ApiProperty({description: 'Tags for nutrient levels', type: [String]})
  @IsArray()
  @IsString({each: true})
  nutrient_levels_tags: string[];

  @ApiProperty({description: 'Nutriments', type: Object})
  @ValidateNested()
  @Type(() => NutrimentsData)
  nutriments: NutrimentsData;

  @ApiProperty({description: 'Nutriscore', type: Object})
  @IsArray()
  nutriscore: object;

  @ApiProperty({description: 'Packaging materials'})
  @IsString()
  packaging: string;

  @ApiProperty({description: 'Language code for packaging'})
  @IsString()
  packaging_lc: string;

  @ApiProperty({description: 'Recycling tags for packaging', type: [String]})
  @IsArray()
  @IsString({each: true})
  packaging_recycling_tags: string[];

  @ApiProperty({description: 'PNNS groups 1'})
  @IsString()
  pnns_groups_1: string;

  @ApiProperty({description: 'Tags for PNNS groups 1', type: [String]})
  @IsArray()
  @IsString({each: true})
  pnns_groups_1_tags: string[];
  @ApiProperty({description: 'PNNS groups 2'})
  @IsString()
  pnns_groups_2: string;

  @ApiProperty({description: 'Tags for PNNS groups 2', type: [String]})
  @IsArray()
  @IsString({each: true})
  pnns_groups_2_tags: string[];

  @ApiProperty({description: 'Popularity key'})
  @IsNumber()
  popularity_key: number;

  @ApiProperty({description: 'Popularity tags', type: [String]})
  @IsArray()
  @IsString({each: true})
  popularity_tags: string[];

  @ApiProperty({description: 'Product name'})
  @IsString()
  product_name: string;

  @ApiProperty({description: 'Product name in English'})
  @IsString()
  product_name_en: string;

  @ApiProperty({description: 'Product name in Italian'})
  @IsString()
  product_name_it: string;

  @ApiProperty({description: 'Product quantity'})
  @IsString()
  product_quantity: string;

  @ApiProperty({description: 'Quantity of the product'})
  @IsString()
  quantity: string;

  @ApiProperty({description: 'Image URLs', type: Object})
  @IsOptional()
  @IsArray()
  selected_images: object;

  @ApiProperty({description: 'Serving quantity'})
  @IsString()
  serving_quantity: string;

  @ApiProperty({description: 'Serving size'})
  @IsString()
  serving_size: string;

  @ApiProperty({description: 'Stores'})
  @ApiProperty({description: 'Stores'})
  @IsString()
  stores: string;

  @ApiProperty({description: 'Tags for stores', type: [String]})
  @IsArray()
  @IsString({each: true})
  stores_tags: string[];

  @ApiProperty({description: 'Traces'})
  @IsString()
  traces: string;

  @ApiProperty({description: 'Traces from ingredients'})
  @IsString()
  traces_from_ingredients: string;

  @ApiProperty({description: 'Traces from user'})
  @IsString()
  traces_from_user: string;

  @ApiProperty({description: 'Traces hierarchy', type: [String]})
  @IsArray()
  @IsString({each: true})
  traces_hierarchy: string[];

  @ApiProperty({description: 'Language code for traces'})
  @IsString()
  traces_lc: string;

  @ApiProperty({description: 'Tags for traces', type: [String]})
  @IsArray()
  @IsString({each: true})
  traces_tags: string[];

  @ApiProperty({description: 'Unknown ingredients number'})
  @IsNumber()
  unknown_ingredients_n: number;

  @ApiProperty({description: 'Tags for unknown nutrients', type: [String]})
  @IsArray()
  @IsString({each: true})
  unknown_nutrients_tags: string[];

  @ApiProperty({description: 'Update key'})
  @IsString()
  update_key: string;

  @ApiProperty({description: 'Tags for vitamins', type: [String]})
  @IsArray()
  @IsString({each: true})
  vitamins_tags: string[];
}