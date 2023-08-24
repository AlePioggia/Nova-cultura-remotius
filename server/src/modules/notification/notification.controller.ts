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
    HttpException,
    HttpStatus,
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
        try {
            const token: any = jwt.decode(authHeader.split(' ')[1]);
            return await this.notificationService.createNotification(
                token?.mail,
                notificationContent,
            );
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getNotifications(
        @Headers('Authorization') authHeader: string,
    ): Promise<Notification[]> {
        try {
            const token: any = jwt.decode(authHeader.split(' ')[1]);
            return await this.notificationService.getNotificationsByMail(
                token?.mail,
            );
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteLesson(@Param('id') id: string) {
        try {
            return await this.notificationService.deleteOne(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
