import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../users/user.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  province: string;

  @Prop()
  city: string;

  @Prop()
  postalCode: string;

  @Prop()
  address: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
