import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Roles } from 'src/shared/enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ default: Roles.USER })
  role: Roles;
}

export const UserSchema = SchemaFactory.createForClass(User);
