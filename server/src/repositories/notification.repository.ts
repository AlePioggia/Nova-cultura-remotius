import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    Notification,
    NotificationDocument,
} from 'src/schemas/notification.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NotificationRepository {
    constructor(
        @InjectModel(Notification.name)
        private notificationModel: Model<NotificationDocument>,
    ) {}

    async create(
        mail: string,
        notificationContent: string,
    ): Promise<Notification> {
        const newNotification = new this.notificationModel({
            id: uuidv4(),
            mail: mail,
            notificationContent: notificationContent,
            timeStamp: new Date(),
        });
        return newNotification.save();
    }

    async findByMail(mail: string): Promise<Notification[]> {
        return this.notificationModel.find({ mail }).exec();
    }

    async deleteOne(filter: any): Promise<any> {
        return this.notificationModel.deleteOne(filter);
    }
}
