import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: [true, 'User name is required'] })
  userName: string;
  @Prop({ unique: true, required: [true, 'Email is required'] })
  email: string;
  @Prop({ required: false })
  phoneNumber: string;
}

export const userSchema = SchemaFactory.createForClass(User).set(
  'timestamps',
  true,
);
