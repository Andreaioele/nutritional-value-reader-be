import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../auth/schemas/user.schema'; // Import your model interface

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User> // Inject your model
  ) {}

  async find(collection: string, query: object): Promise<any[]> {
    switch (collection) {
      case 'users':
        return this.userModel.find(query).exec();
      // Add more cases for other collections/models if needed
      default:
        throw new Error('Unknown collection');
    }
  }

  async insert(collection: string, document: object): Promise<any> {
    switch (collection) {
      case 'users':
        const newUser = new this.userModel(document);
        return newUser.save();
      // Add more cases for other collections/models if needed
      default:
        throw new Error('Unknown collection');
    }
  }

  async update(collection: string, query: object, update: object): Promise<any> {
    switch (collection) {
      case 'users':
        return this.userModel.updateOne(query, update).exec();
      // Add more cases for other collections/models if needed
      default:
        throw new Error('Unknown collection');
    }
  }

  async delete(collection: string, query: object): Promise<any> {
    switch (collection) {
      case 'users':
        return this.userModel.deleteOne(query).exec();
      // Add more cases for other collections/models if needed
      default:
        throw new Error('Unknown collection');
    }
  }
}