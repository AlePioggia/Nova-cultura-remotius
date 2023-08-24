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
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { ChatService } from './chat.service';
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
        try {
            const token: any = jwt.decode(authHeader.split(' ')[1]);
            createChatMessageDto.senderMail = token?.mail;
            return await this.chatService.createMessage(createChatMessageDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('messages')
    async getAllMessages(): Promise<ChatMessage[]> {
        try {
            return await this.chatService.getAllMessages();
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('messages/sender')
    async getMessagesBySender(
        @Headers('Authorization') authHeader: string,
        @Query('receiver') receiver: string,
    ): Promise<ChatMessage[]> {
        try {
            const token: any = jwt.decode(authHeader.split(' ')[1]);
            return await this.chatService.getMessagesBySender(
                token?.mail,
                receiver,
            );
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('messages/receiver')
    async getMessagesByReceiver(
        @Headers('Authorization') authHeader: string,
        @Query('sender') sender: string,
    ): Promise<ChatMessage[]> {
        try {
            const token: any = jwt.decode(authHeader.split(' ')[1]);
            return await this.chatService.getMessagesByReceiver(
                token?.mail,
                sender,
            );
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('message/:id')
    async getMessageById(@Param('id') id: string): Promise<ChatMessage> {
        try {
            const message = await this.chatService.getMessageById(id);
            if (!message) {
                throw new NotFoundException('Message not found');
            }
            return message;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Put('message/:id')
    async updateMessage(
        @Param('id') id: string,
        @Body() updateChatMessageDto: Partial<ChatMessage>,
    ): Promise<ChatMessage> {
        try {
            return await this.chatService.updateMessage(
                id,
                updateChatMessageDto,
            );
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('message/:id')
    async deleteMessage(@Param('id') id: string): Promise<ChatMessage> {
        try {
            return await this.chatService.deleteMessage(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
