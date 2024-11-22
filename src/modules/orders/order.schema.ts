import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../users/user.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Address {
  @Prop()
  province: string;

  @Prop()
  city: string;

  @Prop()
  postalCode: string;

  @Prop()
  detail: string;
}

@Schema()
export class Order {
  @Prop()
  address: Address;

  @Prop()
  date: Date;

  @Prop()
  totalAmount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
