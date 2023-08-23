import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
    @Prop()
    id: string;

    @Prop()
    mail: string;

    @Prop()
    notificationContent: string;

    @Prop()
    timeStamp?: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
