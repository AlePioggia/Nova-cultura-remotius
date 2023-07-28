import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson {
    @Prop()
    id: string;

    @Prop()
    teacherMail: string;

    @Prop()
    studentMail: string;

    @Prop()
    startTime: Date;

    @Prop()
    endTime: Date;

    @Prop()
    subject: string;

    @Prop()
    notes: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
