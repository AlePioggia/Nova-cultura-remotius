import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
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
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    age: number;

    @Prop()
    address: string;

    @Prop()
    hash: string;

    @Prop()
    roleId: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
