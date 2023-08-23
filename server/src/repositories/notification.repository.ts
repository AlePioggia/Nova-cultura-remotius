import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    Notification,
    NotificationDocument,
} from 'src/schemas/notification.schema';

@Injectable()
export class NotificationRepository {
    constructor(
        @InjectModel(Notification.name)
        private notificationModel: Model<NotificationDocument>,
    ) {}

    async create(mail: string, message: string): Promise<Notification> {
        const newNotification = new this.notificationModel({
            mail,
            message,
            timeStamp: new Date(),
        });
        return newNotification.save();
    }

    async findByMail(mail: string): Promise<Notification[]> {
        return this.notificationModel.find({ mail }).exec();
    }
}
