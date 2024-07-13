import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  toHexString() {
    throw new Error('Method not implemented.');
  }
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop({ unique: [true, 'Duplicate phone number entered'] })
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
