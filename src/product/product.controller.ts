import {Body, Controller, Get, Post} from '@nestjs/common';
import axios from 'axios'
import {ProductService} from "./product.service";
import {FindProductDto, FindProductErrorDto, FindProductResponseDto} from "./dto/Product.dto";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('product')
export class ProductController {
  constructor(
    private readonly openfoodService: ProductService
  ) {}

  /**
   * @description
   * Finds a product in the BE system.
   * This endpoint finds a single product in the BE system. First, it searches in the cache; if it's available, it returns it.
   * Then, it searches in the DATABASE system. If it's found, it's saved in the cache and returned.
   * If it's not found in the database, it searches in an external API and saves the product in the database and cache.
   * The response is an object containing the product or an error message.
   * @route POST /product/find
   * @returns {Promise<{ product?: string; error?: string }>} - The product object or an error message
   */
  @ApiTags('Product')
  @ApiOperation({ summary: 'Finds a product in the BE system' })
  @ApiBody({ type: FindProductDto })
  @ApiResponse({
    status: 201,
    description: 'Product found',
    isArray: false,
    type: FindProductResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Product not found',
    isArray: false,
    type: FindProductErrorDto
  })
  @Post('find')
  async findProduct(
    @Body() productDto: FindProductDto
  ): Promise<{ product?: string; error?: string }> {
    try {
      const response = await this.openfoodService.findProductByBarcode(productDto);
      if (response.status === 404) {
        return { error: "Product not found" };
      } else {
        return { product: response };
      }
    } catch (error) {
      return { error: error.message };
    }
  }

  //TODO: retrieve multiple product from database. The input
  /*
 * The input is
 * - A list of product IDs
 * - A user authentication token
 * - Any additional filters (e.g., category, price range)
 *
 * The method should:
 * - Validate the input
 * - Retrieve the products from the database
 * - Handle any exceptions
 * - Return the list of products
 */

}
