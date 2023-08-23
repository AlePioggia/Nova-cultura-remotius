import { Injectable } from '@nestjs/common';
import { NotificationRepository } from 'src/repositories/notification.repository';
import { Notification } from 'src/schemas/notification.schema';

@Injectable()
export class NotificationService {
    constructor(
        private readonly notificationRepository: NotificationRepository,
    ) {}

    async createNotification(
        mail: string,
        notificationContent: string,
    ): Promise<Notification> {
        return this.notificationRepository.create(mail, notificationContent);
    }

    async getNotificationsByMail(mail: string): Promise<Notification[]> {
        return this.notificationRepository.findByMail(mail);
    }

    async deleteOne(id: string) {
        try {
            await this.notificationRepository.deleteOne({ id: id });
        } catch (error) {
            throw error;
        }
    }
}
