import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsArray, IsNotEmpty, IsInt} from 'class-validator';

export class CreatePantryDto {
  @ApiProperty({
    description: 'Name of the pantry',
    example: 'My Pantry'
  })
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @ApiProperty({
    description: 'Description of the pantry',
    example: 'This is my personal pantry.'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'List of product codes in the pantry',
    example: ['8001120672438', '8001120672439']
  })
  @IsArray()
  @IsString({ each: true, message: 'Each product code must be a string' })
  productsCode: string[];
}

export class CreatePantryResponseDto {
  @ApiProperty({
    description: 'ID of the created pantry',
    example: '669fb86d204b248f93741672'
  })
  @IsString()
  @IsNotEmpty({ message: 'Pantry ID should not be empty' })
  pantryId: string;
}

export class CreatePantryErrorDto {
  @ApiProperty({
    description: 'Array of error messages',
    example: ["Name should not be empty", "name must be a string"]
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