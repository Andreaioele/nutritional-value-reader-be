import {Body, Controller, Get, Post} from '@nestjs/common';
import axios from 'axios'
import {OpenfoodService} from "./openfood.service";

@Controller('openfood')
export class OpenfoodController {
  constructor(
    private readonly openfoodService: OpenfoodService
  ) {}

  @Post('ofs')
  async findProduct (
    @Body ('barcode') barcode: string
  ){
    try{
      const response = await this.openfoodService.findProductByBarcode(barcode);
      if (response.status === "success"){
        return response;
      }else if(response.status === 404){
        return {
          error: "Product not found"
        }
      }
    }catch (error) {
      return { error: error.message };
    };
  }
}
