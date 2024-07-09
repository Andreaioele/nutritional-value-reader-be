import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import {OpenfoodModule} from "./openfood/openfood/openfood.module";

dotenv.config();

@Module({
  imports: [
    OpenfoodModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        const uri = `mongodb+srv://${process.env.MONGODB_USERNAME_PROD}:${process.env.MONGODB_PASSWORD_PROD}@cluster-ai.xepqosm.mongodb.net/${process.env.MONGODB_DATABASE_NAME_PROD}?retryWrites=true&w=majority`;
        const client = new MongoClient(uri);
        await client.connect();
        return client.db(process.env.MONGODB_DATABASE_NAME_LOCAL);
      },
    },
  ],
})
export class AppModule {}