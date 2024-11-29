import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../users/user.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop(
    raw({
      province: { type: String, rquired: true },
      city: { type: String, rquired: true },
      postalCode: { type: String, rquired: true },
      detail: { type: String, rquired: true },
    }),
  )
  address: Record<string, any>;

  @Prop(
    raw([
      {
        productId: { type: String, rquired: true },
        title: { type: String, rquired: true },
        quantity: { type: Number, rquired: true },
        price: { type: Number, rquired: true },
      },
    ]),
  )
  products: Record<string, any>[];

  @Prop({ type: Number, required: true })
  totalAmount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
