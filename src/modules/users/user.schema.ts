import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/shared/enum';
import { OrderSchema } from '../orders/order.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  phoneNumber: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ default: Role.USER })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('findOneAndDelete', async function (next) {
  try {
    const userID = this.getQuery()._id;
    const orderModel = this.model.db.model('Order', OrderSchema);

    await orderModel.deleteMany({
      category: new mongoose.Types.ObjectId(userID),
    });
    next();
  } catch (error) {
    console.error('خطا در حذف سفارش', error);
    next();
  }
});
