import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { FindProductDto } from './dto/create-product';
import { Product } from './schemas/product.schema';
import * as process from "node:process";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async findProductByBarcode(findProductDto: FindProductDto) {
    try {
      // Verifica se il prodotto è presente nella cache
      const productFromCache = await this.cacheManager.get(findProductDto.code);
      if (productFromCache) {
        Logger.log(`Product from cache: ${JSON.stringify(findProductDto.code)}`);
        return productFromCache;
      }

      // Verifica se il prodotto è presente nel database
      const productFromDB = await this.productModel.findOne({ code: findProductDto.code }).exec();
      if (productFromDB) {
        Logger.log(`Product from database: ${JSON.stringify(findProductDto.code)}`);
        // Inserisci il prodotto nella cache
        await this.cacheManager.set(findProductDto.code.toString(), productFromDB, parseInt(process.env.CACHE_TTL));
        return productFromDB;
      }

      // Se il prodotto non è presente né nella cache né nel database, fai una richiesta all'API esterna
      const headers = {
        'Content-Type': 'application/json',
      };
      const url =  `https://world.openfoodfacts.net/api/v3/product/${findProductDto.code}`;

      const response = await axios.get(url, { headers });
      //Logger.log('Risposta chiamata:', response.data.product);

      if (response.data && response.data.product) {
        // Inserisci il prodotto nella cache
        await this.cacheManager.set(findProductDto.code.toString(), response.data.product, 0);

        // Inserisci il prodotto nel database
        const newProduct = new this.productModel(response.data.product);
        await newProduct.save();

        return response.data.product;
      } else {
        return {
          status: 404,
        };
      }
    } catch (error) {
      Logger.log(error);
      if (error.response && error.response.status === 404) {
        console.error('404');
      }
      if (error.response && error.response.status === 502){
        console.error('502');
      }
      return {
        status: error.response ? error.response.status : 500,
      };
    }
  }
}