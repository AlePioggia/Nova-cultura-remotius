import { NotificationService } from './notification.service';
import * as jwt from 'jsonwebtoken';
import {
    Post,
    Headers,
    Controller,
    Body,
    Get,
    UseGuards,
    Delete,
    Param,
} from '@nestjs/common';
import { Notification } from 'src/schemas/notification.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createNotification(
        @Headers('Authorization') authHeader: string,
        @Body('notificationContent') notificationContent: string,
    ) {
        const token: any = jwt.decode(authHeader.split(' ')[1]);
        return this.notificationService.createNotification(
            token?.mail,
            notificationContent,
        );
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getNotifications(
        @Headers('Authorization') authHeader: string,
    ): Promise<Notification[]> {
        const token: any = jwt.decode(authHeader.split(' ')[1]);
        return this.notificationService.getNotificationsByMail(token?.mail);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteLesson(@Param('id') id: string) {
        return await this.notificationService.deleteOne(id);
    }
}
