import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly db: Db
  ) {}

  async find(collection: string, query: object): Promise<any[]> {
    return this.db.collection(collection).find(query).toArray();
  }

  async insert(collection: string, document: object): Promise<any> {
    return this.db.collection(collection).insertOne(document);
  }

  async update(collection: string, query: object, update: object): Promise<any> {
    return this.db.collection(collection).updateOne(query, { $set: update });
  }

  async delete(collection: string, query: object): Promise<any> {
    return this.db.collection(collection).deleteOne(query);
  }
}