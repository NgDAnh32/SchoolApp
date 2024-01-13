import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExamDocument = HydratedDocument<Exam>;

@Schema({ timestamps: true })
export class Exam {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  duration: string;

  @Prop()
  content: string;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
