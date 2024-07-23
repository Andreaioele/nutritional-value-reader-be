import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, Matches, } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John23',
  })
  @IsString({ message: 'First name must be a string' })
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'First name can only contain letters and numbers' })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe2',
  })
  @IsString({ message: 'Last name must be a string' })
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Last name can only contain letters and numbers' })
  lastName: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe2@example.com',
  })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'password123',
  })
  @IsString({ message: 'Password must be a string' })
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  password: string;
}