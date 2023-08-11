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

    @Prop({
        required: true,
        unique: true,
    })
    studentMail: string;

    @Prop()
    amount: number;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
