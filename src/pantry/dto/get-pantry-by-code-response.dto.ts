import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsInt} from 'class-validator';

/**
 * ResponseDto represents the structure of the response for a "Pantry not found" error.
 */
export class GetPantryByCodeResponseErrorDto {
  @ApiProperty({
    description: 'Error message detailing the nature of the error',
    example: 'Pantry not found',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'General description of the error type',
    example: 'Not Found',
  })
  @IsString()
  error: string;

  @ApiProperty({
    description: 'HTTP status code representing the error',
    example: 404,
  })
  @IsInt()
  statusCode: number;
}