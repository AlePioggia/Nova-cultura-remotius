import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PurchaseDocument = Purchase & Document;

@Schema()
export class Purchase {
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
    operationId: number;

    @Prop()
    amount: number;

    @Prop()
    lessonId: number;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
