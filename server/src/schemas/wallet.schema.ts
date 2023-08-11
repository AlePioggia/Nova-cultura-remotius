import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
    @Prop({
        required: true,
        unique: true,
    })
    id: string;

    @Prop({
        required: true,
        unique: true,
    })
    mail: string;

    @Prop()
    balance: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
