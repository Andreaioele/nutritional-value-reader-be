import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Pantry extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users', required: true })
  userId: MongooseSchema.Types.ObjectId;


  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: [] })
  products: string[];
}

export const PantrySchema = SchemaFactory.createForClass(Pantry);