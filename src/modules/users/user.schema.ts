import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/shared/enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
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
