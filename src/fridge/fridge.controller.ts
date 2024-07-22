import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFridgeDto, CreateFridgeErrorDto, CreateFridgeResponseDto } from './dto/Fridge.dto';
import { FridgeService } from './fridge.service';

@ApiTags('Fridge')
@Controller('fridge')
export class FridgeController {
  constructor(private readonly fridgeService: FridgeService) {}

  @ApiOperation({ summary: 'Create fridge in user account' })
  @ApiBody({ type: CreateFridgeDto })
  @ApiResponse({
    status: 201,
    description: 'Fridge created',
    isArray: false,
    type: CreateFridgeResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Fridge not created',
    isArray: false,
    type: CreateFridgeErrorDto,
  })
  @Post('create')
  async createFridge(@Body() createFridgeDto: CreateFridgeDto): Promise<{ fridge?: object; error?: string; }> {
    try {
      const result = await this.fridgeService.createFridge(createFridgeDto);
      return { fridge: result.ops[0] };  // Assuming MongoDB returns the inserted document in `ops`
    } catch (error) {
      throw new HttpException({ error: 'Fridge not created' }, HttpStatus.UNAUTHORIZED);
    }
  }

  // TODO: deleteFridge
  // TODO: addProduct
  // TODO: removeProduct
}