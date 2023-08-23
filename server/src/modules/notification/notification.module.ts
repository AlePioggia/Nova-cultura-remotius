import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Notification,
    NotificationMessageSchema,
} from 'src/schemas/notification.schema';
import { NotificationRepository } from 'src/repositories/notification.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Notification.name, schema: NotificationMessageSchema },
        ]),
    ],
    controllers: [NotificationController],
    providers: [NotificationService, NotificationRepository],
    exports: [NotificationService],
})
export class NotificationModule {}
