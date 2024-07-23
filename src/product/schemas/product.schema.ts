import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ strict: false })
export class Product extends Document {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({ required: true })
  code: string;

  // Aggiungi altre proprietà necessarie per il prodotto
}

export const ProductSchema = SchemaFactory.createForClass(Product);