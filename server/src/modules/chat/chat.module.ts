import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import {
    ChatMessage,
    ChatMessageSchema,
} from 'src/schemas/chat-message.schema';
import { ChatMessageRepository } from 'src/repositories/chat-messages.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ChatMessage.name, schema: ChatMessageSchema },
        ]),
    ],
    controllers: [],
    providers: [ChatService, ChatGateway, ChatMessageRepository],
})
export class ChatModule {}
