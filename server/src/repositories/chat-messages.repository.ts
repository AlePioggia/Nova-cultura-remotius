import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    ChatMessage,
    ChatMessageDocument,
} from 'src/schemas/chat-message.schema';

@Injectable()
export class ChatMessageRepository {
    constructor(
        @InjectModel(ChatMessage.name)
        private chatMessageModel: Model<ChatMessageDocument>,
    ) {}

    async create(
        createChatMessageDto: Partial<ChatMessage>,
    ): Promise<ChatMessageDocument> {
        const createdMessage = new this.chatMessageModel(createChatMessageDto);
        return createdMessage.save();
    }

    async findAll(): Promise<ChatMessageDocument[]> {
        return this.chatMessageModel.find().exec();
    }

    async findBySender(senderMail: string): Promise<ChatMessageDocument[]> {
        return this.chatMessageModel.find({ senderMail }).exec();
    }

    async findByReceiver(receiverMail: string): Promise<ChatMessageDocument[]> {
        return this.chatMessageModel.find({ receiverMail }).exec();
    }

    async findOne(id: string): Promise<ChatMessageDocument> {
        return this.chatMessageModel.findById(id).exec();
    }

    async update(
        id: string,
        updateChatMessageDto: Partial<ChatMessage>,
    ): Promise<ChatMessageDocument> {
        return this.chatMessageModel
            .findByIdAndUpdate(id, updateChatMessageDto, { new: true })
            .exec();
    }

    async delete(id: string): Promise<ChatMessageDocument> {
        return this.chatMessageModel.findByIdAndRemove(id).exec();
    }
}
