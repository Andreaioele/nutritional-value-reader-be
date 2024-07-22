import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { DatabaseService } from './database.service';
import { UserSchema } from '../auth/schemas/user.schema';

dotenv.config();

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: `mongodb+srv://${process.env.MONGODB_USERNAME_PROD}:${process.env.MONGODB_PASSWORD_PROD}@cluster-ai.xepqosm.mongodb.net/${process.env.MONGODB_DATABASE_NAME_PROD}?retryWrites=true&w=majority`,
      }),
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Add your model here
  ],
  providers: [DatabaseService],
  exports: [MongooseModule, DatabaseService],
})
export class DatabaseModule {}