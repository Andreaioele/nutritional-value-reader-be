import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class LoginUserResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwic3ViIjoiNjY5ZmI4NjYyMDRiMjQ4ZjkzNzQxNjZlIiwiaWF0IjoxNzIxNzQ4MDc1LCJleHAiOjE3MjE3NTE2NzV9.ueI6s9_gZBSRmOW9P7-mXg_7idD7uIJuz-AKugSYJEU'
  })
  @IsString({message: 'Access token must be a string'})
  access_token: string;
}