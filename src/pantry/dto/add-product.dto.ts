import {IsNotEmpty, IsString} from "class-validator";

export class AddProductToPantryDto {
  @IsString()
  @IsNotEmpty()
  code: string
}

export class AddProductToPantryResponseDto {

}

export class AddProductToPantryErrorResponseDto {}
