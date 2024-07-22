import {Inject, Injectable, Logger} from '@nestjs/common';
import axios, {AxiosResponse} from 'axios'
import {DatabaseService} from "../database/database.service";
import {Cache} from 'cache-manager';
import {CACHE_MANAGER} from "@nestjs/cache-manager"
import {FindProductDto} from "./dto/Product.dto";

@Injectable()
export class ProductService {

  constructor(
    private dbService: DatabaseService,
    @Inject(CACHE_MANAGER) public cacheManager: Cache) {
  }

  async findProductByBarcode(findProductDto: FindProductDto) {
    try {
      // Verifica se il prodotto è presente nella cache
      const productFromCache = await this.cacheManager.get(findProductDto.barcode);
      if (productFromCache) {
        Logger.log(`Product from cache: ${JSON.stringify(findProductDto.barcode)}`);
        return productFromCache;
      }

      // Verifica se il prodotto è presente nel database
      const productFromDB = await this.dbService.find('products', {code: findProductDto.barcode});
      if (productFromDB.length>0) {
        Logger.log(`Product from database: ${JSON.stringify(findProductDto.barcode)}`);
        // Inserisci il prodotto nella cache
        await this.cacheManager.set(findProductDto.barcode.toString(), productFromDB[0], 0);
        return productFromDB[0];
      }

      // Se il prodotto non è presente né nella cache né nel database, fai una richiesta all'API esterna
      const headers = {
        'Content-Type': 'application/json',
      };
      const url = `https://world.openfoodfacts.net/api/v3/product/${findProductDto.barcode}`;


      const response = await axios.get(url, {headers: headers});
      Logger.log('Risposta chiamata:', response.data.product);

      // Inserisci il prodotto nella cache
      await this.cacheManager.set(findProductDto.barcode.toString(), response.data.product, 0);

      // Inserisci il prodotto nel database
      await this.dbService.insert('products', response.data.product);

      if (response) {
        return response.data.product;
      } else {
        return {
          status: 404,
        };
      }
    } catch (error) {
      Logger.log(error);
      if (error.response.status === 404) {
        console.error('404');
      }
      return {
        status: error.response.status,
      };
    }
  }
}
