import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsArray, IsOptional, IsNumber, IsObject, ValidateNested, ArrayNotEmpty} from 'class-validator';
import {Type} from 'class-transformer';

export class Agribalyse {
  @ApiProperty({description: 'Agribalyse food code', example: '26039'})
  @IsString()
  agribalyse_food_code: string;

  @ApiProperty({description: 'CO2 emissions from agriculture', example: 5.3885872})
  @IsNumber()
  co2_agriculture: number;

  @ApiProperty({description: 'CO2 emissions from consumption', example: 0})
  @IsNumber()
  co2_consumption: number;

  @ApiProperty({description: 'CO2 emissions from distribution', example: 0.022630512})
  @IsNumber()
  co2_distribution: number;

  @ApiProperty({description: 'CO2 emissions from packaging', example: 9.7697831})
  @IsNumber()
  co2_packaging: number;

  @ApiProperty({description: 'CO2 emissions from processing', example: 0.59392979})
  @IsNumber()
  co2_processing: number;

  @ApiProperty({description: 'Total CO2 emissions', example: 16.893125602})
  @IsNumber()
  co2_total: number;

  @ApiProperty({description: 'CO2 emissions from transportation', example: 1.118195})
  @IsNumber()
  co2_transportation: number;

  @ApiProperty({description: 'DQR value', example: '3.1'})
  @IsString()
  dqr: string;

  @ApiProperty({description: 'Environmental footprint from agriculture', example: 1.0250893})
  @IsNumber()
  ef_agriculture: number;

  @ApiProperty({description: 'Environmental footprint from consumption', example: 0})
  @IsNumber()
  ef_consumption: number;

  @ApiProperty({description: 'Environmental footprint from distribution', example: 0.006448083})
  @IsNumber()
  ef_distribution: number;

  @ApiProperty({description: 'Environmental footprint from packaging', example: 0.88558917})
  @IsNumber()
  ef_packaging: number;

  @ApiProperty({description: 'Environmental footprint from processing', example: 0.062197864})
  @IsNumber()
  ef_processing: number;

  @ApiProperty({description: 'Total environmental footprint', example: 2.076183865})
  @IsNumber()
  ef_total: number;

  @ApiProperty({description: 'Environmental footprint from transportation', example: 0.096859448})
  @IsNumber()
  ef_transportation: number;

  @ApiProperty({description: 'Is beverage', example: 0})
  @IsNumber()
  is_beverage: number;

  @ApiProperty({description: 'Name in English', example: 'Tuna, plain, canned, drained'})
  @IsString()
  name_en: string;

  @ApiProperty({description: 'Name in French', example: 'Thon, au naturel, appertisé, égoutté'})
  @IsString()
  name_fr: string;

  @ApiProperty({description: 'Score', example: 11})
  @IsNumber()
  score: number;

  @ApiProperty({description: 'Version', example: '3.1'})
  @IsString()
  version: string;
}

export class EcoscoreData {
  @ApiProperty({type: Agribalyse})
  @ValidateNested()
  @Type(() => Agribalyse)
  agribalyse: Agribalyse;

  @ApiProperty({description: 'Grade', example: 'e'})
  @IsString()
  grade: string;

  @ApiProperty({description: 'Grades by country', type: 'object'})
  @IsObject()
  grades: Record<string, string>;

  @ApiProperty({description: 'Previous data', type: 'object'})
  @IsObject()
  previous_data: Record<string, any>;

  @ApiProperty({description: 'Score', example: 5})
  @IsNumber()
  score: number;

  @ApiProperty({description: 'Scores by country', type: 'object'})
  @IsObject()
  scores: Record<string, number>;

  @ApiProperty({description: 'Status', example: 'known'})
  @IsString()
  status: string;
}

export class ProductDto {
  @ApiProperty({description: 'Unique identifier for the product', example: '8001120811011'})
  @IsString()
  _id: string;

  @ApiProperty({description: 'Keywords associated with the product', example: ['no', 'canned', 'tuna']})
  @IsArray()
  @ArrayNotEmpty()
  @IsString({each: true})
  _keywords: string[];

  @ApiProperty({description: 'Tags for countries where the product is added', example: []})
  @IsArray()
  @IsOptional()
  @IsString({each: true})
  added_countries_tags: string[];

  @ApiProperty({description: 'Tags for allergens', example: ['en:fish', 'it:tonno']})
  @IsArray()
  @ArrayNotEmpty()
  @IsString({each: true})
  allergens_tags: string[];

  @ApiProperty({description: 'Brands associated with the product', example: 'Coop, Nino Castiglione'})
  @IsString()
  brands: string;

  @ApiProperty({description: 'Tags for brands', example: ['coop', 'nino-castiglione']})
  @IsArray()
  @ArrayNotEmpty()
  @IsString({each: true})
  brands_tags: string[];

  @ApiProperty({description: 'Categories of the product', example: 'Frutti di mare, Alimenti in scatola'})
  @IsString()
  categories: string;

  @ApiProperty({description: 'Locale for categories', example: 'it'})
  @IsString()
  categories_lc: string;

  @ApiProperty({description: 'Tags for categories', example: ['en:seafood', 'en:fishes']})
  @IsArray()
  @ArrayNotEmpty()
  @IsString({each: true})
  categories_tags: string[];

  @ApiProperty({description: 'Product code', example: '8001120811011'})
  @IsString()
  code: string;

  @ApiProperty({description: 'Tags for countries', example: ['en:italy']})
  @IsArray()
  @ArrayNotEmpty()
  @IsString({each: true})
  countries_tags: string[];

  @ApiProperty({description: 'Creation timestamp', example: 1574856754})
  @IsNumber()
  created_t: number;

  @ApiProperty({
    description: 'Tags for data quality warnings',
    example: ['en:ecoscore-origins-of-ingredients-origins-are-100-percent-unknown']
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({each: true})
  data_quality_warnings_tags: string[];

  @ApiProperty({type: EcoscoreData})
  @ValidateNested()
  @Type(() => EcoscoreData)
  ecoscore_data: EcoscoreData;

  @ApiProperty({description: 'Extended ecosystem score data', type: 'object'})
  @IsObject()
  ecoscore_extended_data: Record<string, any>;

  @ApiProperty({description: 'Ecoscore grade', example: 'e'})
  @IsString()
  ecoscore_grade: string;

  @ApiProperty({description: 'Ecoscore score', example: 5})
  @IsNumber()
  ecoscore_score: number;

  @ApiProperty({description: 'EMB codes', example: 'IT928CE'})
  @IsString()
  emb_codes: string;

  @ApiProperty({description: 'Generic name', example: ''})
  @IsOptional()
  @IsString()
  generic_name: string;

  @ApiProperty({description: 'Generic name in English', example: ''})
  @IsOptional()
  @IsString()
  generic_name_en: string;

  @ApiProperty({description: 'Generic name in Italian', example: ''})
  @IsOptional()
  @IsString()
  generic_name_it: string;

  @ApiProperty({description: 'Generic name in Polish', example: ''})
  @IsOptional()
  @IsString()
  generic_name_pl: string;

  @ApiProperty({description: 'Product ID', example: '8001120811011'})
  @IsString()
  id: string;

  @ApiProperty({
    description: 'URL for the front image (small)',
    example: 'https://images.openfoodfacts.net/images/products/800/112/081/1011/front_it.39.200.jpg'
  })
  @IsString()
  image_front_small_url: string;

  @ApiProperty({
    description: 'URL for the front image (thumbnail)',
    example: 'https://images.openfoodfacts.net/images/products/800/112/081/1011/front_it.39.100.jpg'
  })
  @IsString()
  image_front_thumb_url: string;

  @ApiProperty({
    description: 'URL for the front image',
    example: 'https://images.openfoodfacts.net/images/products/800/112/081/1011/front_it.39.400.jpg'
  })
  @IsString()
  image_front_url: string;
  @ApiProperty({
    description: 'URL for the ingredients image (small)',
    example: 'https://images.openfoodfacts.net/images/products/800/112/081/1011/ingredients_it.28.200.jpg'
  })
  @IsString()
  image_ingredients_small_url: string;

  @ApiProperty({
    description: 'URL for the ingredients image (thumbnail)',
    example: 'https://images.openfoodfacts.net/images/products/800/112/081/1011/ingredients_it.28.100.jpg'
  })
  @IsString()
  image_ingredients_thumb_url: string;

  @ApiProperty({
    description: 'URL for the ingredients image',
    example: 'https://images.openfoodfacts.net/images/products/800/112/081/1011/ingredients_it.28.400.jpg'
  })
  @IsString()
  image_ingredients_url: string;

  @ApiProperty({
    description: 'URL for the nutrition image (small)',
    example: 'https://images.openfoodfacts.net/images/products/800/112/081/1011/nutrition_it.33.200.jpg'
  })
  @IsString()
  image_nutrition_small_url: string;

  @ApiProperty({
    description: 'URL for the nutrition image (thumbnail)',
    example: 'https://images.openfoodfacts.net/images/products/800/112/081/1011/nutrition_it.33.100.jpg'
  })
  @IsString()
  image_nutrition_thumb_url: string;

  @ApiProperty({
    description: 'URL for the nutrition image',
    example: 'https://images.openfoodfacts.net/images/products/800/112/081/1011/nutrition_it.33.400.jpg'
  })
  @IsString()
  image_nutrition_url: string;

  @ApiProperty({description: 'Serving quantity', example: '56'})
  @IsString()
  serving_quantity: string;

  @ApiProperty({description: 'Serving size', example: '56g'})
  @IsString()
  serving_size: string;

  @ApiProperty({description: 'Stores', example: 'Coop'})
  @IsString()
  stores: string;

  @ApiProperty({description: 'Tags for stores', example: ['coop']})
  @IsArray()
  @ArrayNotEmpty()
  @IsString({each: true})
  stores_tags: string[];

  @ApiProperty({description: 'Traces', example: ''})
  @IsOptional()
  @IsString()
  traces: string;

  @ApiProperty({description: 'Traces from ingredients', example: ''})
  @IsOptional()
  @IsString()
  traces_from_ingredients: string;

  @ApiProperty({description: 'Traces from user', example: '(en) '})
  @IsOptional()
  @IsString()
  traces_from_user: string;

  @ApiProperty({description: 'Traces hierarchy', example: []})
  @IsArray()
  @IsOptional()
  @IsString({each: true})
  traces_hierarchy: string[];

  @ApiProperty({description: 'Traces locale', example: 'en'})
  @IsString()
  traces_lc: string;

  @ApiProperty({description: 'Tags for traces', example: []})
  @IsArray()
  @IsOptional()
  @IsString({each: true})
  traces_tags: string[];

  @ApiProperty({description: 'Unique scans', example: 3})
  @IsNumber()
  unique_scans_n: number;

  @ApiProperty({description: 'Number of unknown ingredients', example: 0})
  @IsNumber()
  unknown_ingredients_n: number;

  @ApiProperty({description: 'Tags for unknown nutrients', example: []})
  @IsArray()
  @IsOptional()
  @IsString({each: true})
  unknown_nutrients_tags: string[];

  @ApiProperty({description: 'Update key', example: '20240209'})
  @IsString()
  update_key: string;

  @ApiProperty({description: 'Tags for vitamins', example: []})
  @IsArray()
  @IsOptional()
  @IsString({each: true})
  vitamins_tags: string[];
}