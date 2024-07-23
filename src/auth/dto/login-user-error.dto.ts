import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class LoginUserValidationErrorDto {
  @ApiProperty({
    description: 'Error message',
    example: 'Invalid email or password'
  })
  @IsString({ message: 'Message must be a string' })
  message: string;

  @ApiProperty({
    description: 'Error type',
    example: 'Unauthorized'
  })
  @IsString({ message: 'Error must be a string' })
  error: string;

  @ApiProperty({
    description: 'HTTP status code',
    example: 401
  })
  @IsInt({ message: 'Status code must be an integer' })
  statusCode: number;
}