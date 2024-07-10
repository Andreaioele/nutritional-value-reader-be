import { Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import { DatabaseService } from './database.service';

dotenv.config();

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        const uri = `mongodb+srv://${process.env.MONGODB_USERNAME_PROD}:${process.env.MONGODB_PASSWORD_PROD}@cluster-ai.xepqosm.mongodb.net/${process.env.MONGODB_DATABASE_NAME_PROD}?retryWrites=true&w=majority`;
        const client = new MongoClient(uri);
        await client.connect();
        return client.db(process.env.MONGODB_DATABASE_NAME_LOCAL);
      },
    },
    DatabaseService,
  ],
  exports: ['DATABASE_CONNECTION', DatabaseService],
})
export class DatabaseModule {}