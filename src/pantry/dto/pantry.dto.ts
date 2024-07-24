import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';

/**
 * PantryDto represents the structure of the Pantry data transfer object.
 */
export class PantryDto {
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
    description: 'List of products code in the pantry',
    example: ['8001120672438', '8001120672437', '8001120672439'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  products: string[];
}