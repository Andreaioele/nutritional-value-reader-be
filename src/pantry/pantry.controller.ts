import {Controller, Post, Body, Request, Query, HttpException, HttpStatus, UseGuards, Logger} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePantryDto, CreatePantryErrorDto, CreatePantryResponseDto } from './dto/create-pantry.dto';
import { PantryService } from './pantry.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {
  AddProductToPantryDto,
  AddProductToPantryErrorResponseDto,
  AddProductToPantryResponseDto
} from "./dto/add-product.dto";
import {
  RemoveProductFromPantryDto,
  RemoveProductToPantryErrorResponseDto,
  RemoveProductToPantryResponseDto
} from "./dto/remove-product.dto";

@ApiTags('Pantry')
@Controller('pantry')
export class PantryController {
  constructor(private readonly pantryService: PantryService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create pantry in user account' })
  @ApiBody({ type: CreatePantryDto })
  @ApiResponse({
    status: 201,
    description: 'Pantry created',
    isArray: false,
    type: CreatePantryResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Pantry not created',
    isArray: false,
    type: CreatePantryErrorDto,
  })
  @Post('create')
  async createPantry(@Body() createPantryDto: CreatePantryDto, @Request() req): Promise<CreatePantryResponseDto> {
    try {
      const userId = req.user.userId;  // Assume that req.user contains the decoded JWT payload with userId
      const result = await this.pantryService.createPantry(createPantryDto, userId);
      return {
        pantryId: result._id.toString(),
      };  // Assuming MongoDB returns the inserted document in `ops`
    } catch (error) {
      Logger.log(error);
      throw new HttpException({ error: 'Pantry not created' }, HttpStatus.UNAUTHORIZED);
    }
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add product in user\'s pantry' })
  @ApiBody({ type: AddProductToPantryDto })
  @ApiResponse({
    status: 201,
    description: 'Product added',
    isArray: false,
    type: AddProductToPantryResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Product not added',
    isArray: false,
    type: AddProductToPantryErrorResponseDto,
  })
  @Post('addProduct')
  async addProductToPantry(
    @Body() addProductToPantryDto: AddProductToPantryDto,
    @Request() req,
    @Query('pantryId') pantryId: string
  ): Promise<AddProductToPantryResponseDto> {
    try {
      const userId = req.user.userId;  // Assume that req.user contains the decoded JWT payload with userId
      const result = await this.pantryService.addProductToPantry(addProductToPantryDto, userId, pantryId);
      return {
        success: true,
      };  // Assuming MongoDB returns the inserted document in `ops`
    } catch (error) {
      Logger.log(error);
      throw new HttpException({ error: 'Pantry not created' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remove product from user\'s pantry' })
  @ApiBody({ type: RemoveProductFromPantryDto })
  @ApiResponse({
    status: 200,
    description: 'Product removed',
    isArray: false,
    type: RemoveProductToPantryResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Product not removed',
    isArray: false,
    type: RemoveProductToPantryErrorResponseDto,
  })
  @Post('removeProduct')
  async removeProductFromPantry(
    @Body() removeProductFromPantryDto: RemoveProductFromPantryDto,
    @Request() req,
    @Query('pantryId') pantryId: string
  ): Promise<{ success: boolean }> {
    try {
      const userId = req.user.userId;  // Assume that req.user contains the decoded JWT payload with userId
      await this.pantryService.removeProductFromPantry(removeProductFromPantryDto, userId, pantryId);
      return { success: true };
    } catch (error) {
      Logger.log(error);
      throw new HttpException({ error: 'Product not removed' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // TODO: deletePantry
}