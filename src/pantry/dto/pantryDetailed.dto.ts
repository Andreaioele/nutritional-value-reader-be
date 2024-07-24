import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';
import {ProductDto} from "../../product/dto/product.dto";

/**
 * PantryDto represents the structure of the Pantry data transfer object.
 */
export class PantryDetailedDto {
  @ApiProperty({
    description: 'Name of the pantry',
    example: 'My Pantry',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the pantry',
    example: 'A place to store all your food items.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'List of products in the pantry',
    type: [ProductDto],
    example: [
      {
        code: '8001120672438',
        // altri dettagli del prodotto
      },
      // altri prodotti
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  products: ProductDto[];
}