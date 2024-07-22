import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePantryDto, CreatePantryErrorDto, CreatePantryResponseDto } from './dto/Pantry.dto';
import { PantryService } from './pantry.service';

@ApiTags('Pantry')
@Controller('pantry')
export class PantryController {
  constructor(private readonly pantryService: PantryService) {}

  @ApiOperation({ summary: 'Create pantry in user account' })
  @ApiBody({ type: CreatePantryDto })
  @ApiResponse({
    status: 201,
    description: 'Pantry created',
    isArray: false,
    type: CreatePantryResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Pantry not created',
    isArray: false,
    type: CreatePantryErrorDto,
  })
  @Post('create')
  async createPantry(@Body() createPantryDto: CreatePantryDto): Promise<{ pantry?: object; error?: string; }> {
    try {
      const result = await this.pantryService.createPantry(createPantryDto);
      return { pantry: result.ops[0] };  // Assuming MongoDB returns the inserted document in `ops`
    } catch (error) {
      throw new HttpException({ error: 'Pantry not created' }, HttpStatus.UNAUTHORIZED);
    }
  }

  // TODO: deletePantry
  // TODO: addProduct
  // TODO: removeProduct
}