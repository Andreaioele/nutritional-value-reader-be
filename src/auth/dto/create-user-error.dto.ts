import {ApiProperty} from '@nestjs/swagger';

export class CreateUserErrorDto {
  @ApiProperty({
    description: 'Descrizione dell\'errore',
    example: 'User with email john.doe2@example.com already exists.',
  })
  message: string;

  @ApiProperty({
    description: 'Tipo di errore',
    example: 'Conflict',
  })
  error: string;

  @ApiProperty({
    description: 'Codice di stato HTTP',
    example: 409,
  })
  statusCode: number;
}

export class CreateUserValidationErrorDto {
  @ApiProperty({
    description: 'Array of error messages',
    example: ["First name can only contain letters and numbers", "First name must be a string"]
  })
  message: string[];

  @ApiProperty({
    description: 'Error type',
    example: 'Bad Request'
  })
  error: string;

  @ApiProperty({
    description: 'HTTP status code',
    example: 400
  })
  statusCode: number;
}