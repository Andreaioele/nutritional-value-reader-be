import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsArray, IsInt} from 'class-validator';

export class RemoveProductFromPantryDto {
  @ApiProperty({
    description: 'Code of the product to be removed from the pantry',
    example: 'prod-001'
  })
  @IsString()
  @IsNotEmpty({ message: 'Product code should not be empty' })
  code: string;
}

export class RemoveProductToPantryResponseDto {
  @ApiProperty({
    description: 'Product removed',
    example: true
  })
  @IsString()
  success: boolean
}

export class RemoveProductToPantryErrorResponseDto {
  @ApiProperty({
    description: 'Array of error messages',
    example: ["Code should not be empty", "code must be a string"]
  })
  @IsArray()
  @IsString({ each: true, message: 'Each error message must be a string' })
  @IsNotEmpty({ message: 'Error messages should not be empty' })
  message: string[];

  @ApiProperty({
    description: 'Error type',
    example: 'Bad Request'
  })
  @IsString()
  @IsNotEmpty({ message: 'Error type should not be empty' })
  error: string;

  @ApiProperty({
    description: 'HTTP status code',
    example: 400
  })
  @IsInt({ message: 'Status code must be an integer' })
  statusCode: number;
}