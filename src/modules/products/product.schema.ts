import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from '../categories/category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
