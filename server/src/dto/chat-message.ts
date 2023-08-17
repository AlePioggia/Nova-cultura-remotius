import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator';

export interface IChatMessage {
    senderMail: string;
    receiverMail: string;
    message: string;
    timestamp?: Date;
}

export class ChatMessage implements IChatMessage {
    senderMail: string;
    receiverMail: string;
    message: string;
    timestamp?: Date;
}
