import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Headers,
    NotFoundException,
    Query,
} from '@nestjs/common';
import { ChatService } from './chat.service'; // Modifica il percorso in base alla tua struttura
import { ChatMessage } from 'src/schemas/chat-message.schema';
import * as jwt from 'jsonwebtoken';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post('message')
    async createMessage(
        @Headers('Authorization') authHeader: string,
        @Body() createChatMessageDto: Partial<ChatMessage>,
    ): Promise<ChatMessage> {
        const token: any = jwt.decode(authHeader.split(' ')[1]);
        createChatMessageDto.senderMail = token?.mail;
        return this.chatService.createMessage(createChatMessageDto);
    }

    @Get('messages')
    async getAllMessages(): Promise<ChatMessage[]> {
        return this.chatService.getAllMessages();
    }

    @Get('messages/sender')
    async getMessagesBySender(
        @Headers('Authorization') authHeader: string,
        @Query('receiver') receiver: string,
    ): Promise<ChatMessage[]> {
        const token: any = jwt.decode(authHeader.split(' ')[1]);
        return this.chatService.getMessagesBySender(token?.mail, receiver);
    }

    @Get('messages/receiver')
    async getMessagesByReceiver(
        @Headers('Authorization') authHeader: string,
        @Query('sender') sender: string,
    ): Promise<ChatMessage[]> {
        const token: any = jwt.decode(authHeader.split(' ')[1]);
        return this.chatService.getMessagesByReceiver(token?.mail, sender);
    }

    @Get('message/:id')
    async getMessageById(@Param('id') id: string): Promise<ChatMessage> {
        return this.chatService.getMessageById(id);
    }

    @Put('message/:id')
    async updateMessage(
        @Param('id') id: string,
        @Body() updateChatMessageDto: Partial<ChatMessage>,
    ): Promise<ChatMessage> {
        return this.chatService.updateMessage(id, updateChatMessageDto);
    }

    @Delete('message/:id')
    async deleteMessage(@Param('id') id: string): Promise<ChatMessage> {
        return this.chatService.deleteMessage(id);
    }
}
