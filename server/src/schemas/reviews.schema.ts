import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
    @Prop({
        required: true,
        unique: true,
    })
    id: string;

    @Prop()
    teacherMail: string;

    @Prop()
    studentMail: string;

    @Prop()
    vote: number;

    @Prop()
    title: string;

    @Prop()
    description: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
