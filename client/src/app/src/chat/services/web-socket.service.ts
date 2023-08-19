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
    console.log(token);
    this.socket = io('ws://localhost:3000/chat', {
      query: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  // Metodo per inviare messaggi
  sendMessage(event: string, message: any): void {
    this.socket.emit(event, message);
  }

  // Metodo per ricevere messaggi
  onMessage(event: string): Observable<any> {
    const observable = new Subject<any>();

    this.socket.on(event, (data: any) => {
      observable.next(data);
    });

    return observable;
  }

  // Metodo per chiudere la connessione WebSocket
  closeConnection(): void {
    this.socket.disconnect();
  }
}
