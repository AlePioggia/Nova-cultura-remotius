import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatMessageRepository } from 'src/repositories/chat-messages.repository';
import { ChatMessage } from 'src/schemas/chat-message.schema';

@Injectable()
export class ChatService {
    constructor(
        private readonly chatMessageRepository: ChatMessageRepository,
    ) {}

    async createMessage(
        createChatMessageDto: Partial<ChatMessage>,
    ): Promise<ChatMessage> {
        return this.chatMessageRepository.create(createChatMessageDto);
    }

    async getAllMessages(): Promise<ChatMessage[]> {
        return this.chatMessageRepository.findAll();
    }

    async getMessagesBySender(senderMail: string): Promise<ChatMessage[]> {
        return this.chatMessageRepository.findBySender(senderMail);
    }

    async getMessagesByReceiver(receiverMail: string): Promise<ChatMessage[]> {
        return this.chatMessageRepository.findByReceiver(receiverMail);
    }

    async getMessageById(id: string): Promise<ChatMessage> {
        const message = await this.chatMessageRepository.findOne(id);
        if (!message) {
            throw new NotFoundException(`Message with ID ${id} not found.`);
        }
        return message;
    }

    async updateMessage(
        id: string,
        updateChatMessageDto: Partial<ChatMessage>,
    ): Promise<ChatMessage> {
        return this.chatMessageRepository.update(id, updateChatMessageDto);
    }

    async deleteMessage(id: string): Promise<ChatMessage> {
        return this.chatMessageRepository.delete(id);
    }
}
