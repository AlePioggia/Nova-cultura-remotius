import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatMessageDocument = ChatMessage & Document;

@Schema()
export class ChatMessage {
    @Prop()
    senderMail: string;

    @Prop()
    receiverMail: string;

    @Prop()
    message: string;

    @Prop()
    timeStamp?: Date;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
