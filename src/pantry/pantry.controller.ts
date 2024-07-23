import {Controller, Post, Body, Request, HttpException, HttpStatus, UseGuards, Logger} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePantryDto, CreatePantryErrorDto, CreatePantryResponseDto } from './dto/Pantry.dto';
import { PantryService } from './pantry.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

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
    status: 401,
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

  // TODO: deletePantry
  // TODO: addProduct
  // TODO: removeProduct
}