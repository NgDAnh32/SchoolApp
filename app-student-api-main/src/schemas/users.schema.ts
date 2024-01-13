import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  // 1: student  2: teacher
  @Prop({ default: 1 })
  role: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
