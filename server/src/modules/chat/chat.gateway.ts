import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayDisconnect,
    OnGatewayConnection,
    MessageBody,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { ChatService } from './chat.service';
import { ChatMessage } from 'src/schemas/chat-message.schema';
import { NotificationService } from '../notification/notification.service';

@WebSocketGateway({
    namespace: '/chat',
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST'],
        credentials: true,
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly chatService: ChatService,
        private readonly notificationService: NotificationService,
    ) {}

    @WebSocketServer() server;

    private users: { [id: string]: string } = {}; // Storing userId: socketId for private messaging

    handleConnection(client: Socket) {
        const userId = this.extractUserIdFromToken(
            client.handshake.query.Authorization as string,
        );
        this.users[userId] = client.id;
        client.emit('connected', { userId, users: this.users });
    }

    handleDisconnect(client: Socket) {
        const userId = this.extractUserIdFromToken(
            client.handshake.query.Authorization as string,
        );
        delete this.users[userId];
    }

    @SubscribeMessage('privateMessage')
    async handlePrivateMessage(
        client: Socket,
        payload: { senderMail: string; receiverMail: string; message: string },
    ): Promise<void> {
        const { senderMail, receiverMail, message } = payload;

        const result = await this.chatService.createMessage({
            senderMail: senderMail,
            receiverMail: receiverMail,
            message: message,
            timeStamp: new Date(),
        });

        const targetSocketId = this.users[receiverMail];
        if (targetSocketId) {
            client.to(targetSocketId).emit('receivePrivateMessage', result);
        }
    }

    @SubscribeMessage('sendNotification')
    async handleNotification(
        client: Socket,
        payload: { receiverMail: string; notificationContent: string },
    ): Promise<void> {
        const { receiverMail, notificationContent } = payload;

        const notification = await this.notificationService.createNotification(
            receiverMail,
            notificationContent,
        );

        const targetSocketId = this.users[receiverMail];
        if (targetSocketId) {
            client
                .to(targetSocketId)
                .emit('receiveNotification', { result: notificationContent });
        }
    }

    private extractUserIdFromToken(authHeader: string): string {
        const token: any = jwt.decode(authHeader.split(' ')[1]);
        return token.mail;
    }
}
