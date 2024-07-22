// login-user.dto.ts
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class FindProductDto {
  @ApiProperty({
    example: '8001120672438',
    description: 'Barcode of the product',
  })
  readonly barcode: string;
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
