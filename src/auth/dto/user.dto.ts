import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsBoolean, Matches, Length } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John'
  })
  @IsString()
  @Matches(/^[A-Za-z0-9]+$/, { message: 'First name can only contain letters and numbers' })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe'
  })
  @IsString()
  @Matches(/^[A-Za-z0-9]+$/, { message: 'Last name can only contain letters and numbers' })
  lastName: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com'
  })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'password123',
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  password?: string;

  @ApiProperty({
    description: 'Indicates if the account is linked to Google',
    example: false,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isGoogleAccount?: boolean;
}