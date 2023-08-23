import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: any;

  constructor() {
    const token = sessionStorage.getItem('access_token');
    this.socket = io('ws://localhost:3000/chat', {
      query: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  sendMessage(event: string, message: any): void {
    this.socket.emit(event, message);
  }

  onMessage(event: string): Observable<any> {
    const observable = new Subject<any>();

    this.socket.on(event, (data: any) => {
      observable.next(data);
    });

    return observable;
  }

  sendNotification(receiverMail: string, notificationContent: string) {
    this.socket.emit('sendNotification', {
      receiverMail: receiverMail,
      notificationContent: notificationContent,
    });
  }

  onNotificationReceived(): Observable<any> {
    const observable = new Subject<any>();

    this.socket.on('receiveNotification', (notification: any) => {
      observable.next(notification);
    });

    return observable;
  }

  closeConnection(): void {
    this.socket.disconnect();
  }
}
