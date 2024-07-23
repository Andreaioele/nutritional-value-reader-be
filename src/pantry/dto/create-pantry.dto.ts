import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreatePantryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  productsCode: string[];
}

export class CreatePantryResponseDto {

  @IsString()
  @IsNotEmpty()
  pantryId: string;
}

export class CreatePantryErrorDto {

}