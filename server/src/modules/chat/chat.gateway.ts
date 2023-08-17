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

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly chatService: ChatService) {}

    @WebSocketServer() server;

    private users: { [id: string]: string } = {}; // Storing userId: socketId for private messaging

    handleConnection(client: Socket) {
        const userId = this.extractUserIdFromToken(
            client.handshake.headers.authorization as string,
        );
        console.log();
        this.users[userId] = client.id;
        client.emit('connected', { userId, users: this.users });
    }

    handleDisconnect(client: Socket) {
        const userId = this.extractUserIdFromToken(
            client.handshake.headers.authorization as string,
        );
        delete this.users[userId];
    }

    @SubscribeMessage('privateMessage')
    async handlePrivateMessage(
        client: Socket,
        payload: { recipientId: string; message: string },
    ): Promise<void> {
        const senderId: any = this.extractUserIdFromToken(
            client.handshake.headers.authorization as string,
        );
        const { recipientId, message } = payload;

        // Salvare il messaggio nel database utilizzando il servizio
        await this.chatService.createMessage({
            senderMail: senderId,
            receiverMail: payload.recipientId,
            message: payload.message,
            timeStamp: new Date(), // se vuoi che il timestamp venga registrato quando viene inviato il messaggio
        });

        const targetSocketId = this.users[recipientId];
        if (targetSocketId) {
            client.to(targetSocketId).emit('receivePrivateMessage', message);
        }
    }

    private extractUserIdFromToken(authHeader: string): string {
        const token: any = jwt.decode(authHeader.split(' ')[1]);
        return token.mail;
    }
}
