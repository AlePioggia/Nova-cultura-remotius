import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  baseUrl: string = '';

  constructor(private http: HttpClient) {
    this.baseUrl = BASE_URL + 'chat/';
  }

  async getMessageByReceiver(sender?: string): Promise<any> {
    const params = new HttpParams().set('sender', sender);
    return this.http
      .get(`${this.baseUrl}messages/receiver`, { params })
      .toPromise();
  }

  async getMessageBySender(receiver?: string): Promise<any> {
    const params = new HttpParams().set('receiver', receiver);
    return this.http
      .get(`${this.baseUrl}messages/sender`, { params })
      .toPromise();
  }

  async getAllMessages(): Promise<any> {
    return this.http.get(`${this.baseUrl}messages`).toPromise();
  }
}
