import { NotificationService } from './notification.service';
import * as jwt from 'jsonwebtoken';
import { Post, Headers, Controller, Body, Get } from '@nestjs/common';
import { Notification } from 'src/schemas/notification.schema';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Post()
    async createNotification(
        @Headers('Authorization') authHeader: string,
        @Body('message') message: string,
    ) {
        const token: any = jwt.decode(authHeader.split(' ')[1]);
        return this.notificationService.createNotification(
            token?.mail,
            message,
        );
    }

    @Get()
    async getNotifications(
        @Headers('Authorization') authHeader: string,
    ): Promise<Notification[]> {
        const token: any = jwt.decode(authHeader.split(' ')[1]);
        return this.notificationService.getNotificationsByMail(token?.mail);
    }
}
