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

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor() {}

    @WebSocketServer() server;

    private users: { [id: string]: string } = {}; // Storing userId: socketId for private messaging

    handleConnection(client: Socket) {
        const userId = this.extractUserIdFromToken(
            client.handshake.headers.authorization as string,
        );
        this.users[userId] = client.id;
        client.emit('connected', { userId, users: this.users });
    }

    handleDisconnect(client: Socket) {
        const userId = this.extractUserIdFromToken(
            client.handshake.query.authorization as string,
        );
        delete this.users[userId];
    }

    @SubscribeMessage('privateMessage')
    handlePrivateMessage(
        client: Socket,
        payload: { recipientId: string; message: string },
    ): void {
        const { recipientId, message } = payload;
        const targetSocketId = this.users[recipientId];
        if (targetSocketId) {
            client.to(targetSocketId).emit('receivePrivateMessage', message);
        }
    }

    // You might have other methods to handle different message types, group chats, etc.

    private extractUserIdFromToken(authHeader: string): string {
        const token: any = jwt.decode(authHeader.split(' ')[1]);
        return token.mail;
    }
}
