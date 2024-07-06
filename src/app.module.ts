import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        const uri = process.env.MONGODB_URI;
        const client = new MongoClient(uri);
        await client.connect();
        return client.db(process.env.MONGODB_DATABASE_NAME_LOCAL);
      },
    },
  ],
})
export class AppModule {}