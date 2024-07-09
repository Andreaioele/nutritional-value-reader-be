import {Injectable} from '@nestjs/common';
import axios, {AxiosResponse} from 'axios'

@Injectable()
export class OpenfoodService {

  async findProductByBarcode(barcode: string){
    const headers = {
      'Content-Type': 'application/json',
    };
    const url = `https://world.openfoodfacts.net/api/v3/product/${barcode}`;
    try {
      const response = await axios.get(url, {
        headers: headers,
      } );
      console.log('Risposta chiamata:', response.data)
      return await response.data;
    } catch (error) {
      if(error.response.status === 404)
      console.error('404');
      return {
        status: error.response.status
      };
    }

  }
}
