import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsString, Matches} from "class-validator";

export class FindProductDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, {
    message: 'Code must be a string of digits',
  })
  @ApiProperty({
    example: '8001120672438',
    description: 'Barcode of the product',
  })
  code: string;
}

export class FindProductResponseDto {
  @ApiPropertyOptional({
    description: 'The product object',
    type: Object,
  })
  product?: object;
}
export class FindProductErrorDto {
  @ApiPropertyOptional({
    description: 'Error message',
    type: String,
  })
  error?: string;
}
