import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovementDocument = HydratedDocument<Movement>;

@Schema()
export class Movement {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  type: 'income' | 'expense';

  @Prop({ required: true })
  amount: number;

  @Prop()
  description?: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const MovementSchema = SchemaFactory.createForClass(Movement);
