import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
    @Prop()
    mail: string;

    @Prop()
    notificationContent: string;

    @Prop()
    timeStamp?: Date;
}

export const NotificationMessageSchema =
    SchemaFactory.createForClass(Notification);
