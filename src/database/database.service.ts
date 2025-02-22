import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../auth/schemas/user.schema';
import { Pantry } from "../pantry/schemas/pantry.schema";
import {ProductDto} from "../product/dto/product.dto";
import {Product} from "../product/schemas/product.schema";

export enum Collections {
  USERS = 'users',
  PANTRIES = 'pantries',
  PRODUCTS = 'products',
}


@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Pantry') private readonly pantryModel: Model<Pantry>,
    @InjectModel('Product') private readonly productModel: Model<ProductDto>
  ) {}

  private getModel(collection: Collections): Model<any> {
    switch (collection) {
      case Collections.USERS:
        return this.userModel;
      case Collections.PANTRIES:
        return this.pantryModel;
      case Collections.PRODUCTS:
        return this.productModel;
      default:
        throw new Error('Unknown collection');
    }
  }

  async find(collection: Collections, query: object): Promise<any[]> {
    const model = this.getModel(collection);
    return model.find(query).exec();
  }

  async findOne<T>(collection: Collections, query: object): Promise<T> {
    const model = this.getModel(collection);
    return model.findOne(query).exec();
  }

  async insert(collection: Collections, document: object): Promise<any> {
    const model = this.getModel(collection);
    const newDocument = new model(document);
    return newDocument.save();
  }

  async update(collection: Collections, query: object, update: object): Promise<any> {
    const model = this.getModel(collection);
    return model.updateOne(query, update).exec();
  }

  async delete(collection: Collections, query: object): Promise<any> {
    const model = this.getModel(collection);
    return model.deleteOne(query).exec();
  }

  async findManyByCodes<ProductDto>(collection: Collections, codes: string[]): Promise<ProductDto[]> {
    const model = this.getModel(collection);
    return model.find({ code: { $in: codes } }).exec();
  }
}