import { HttpClient } from '@angular/common/http';
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

  async getMessageByReceiver(): Promise<any> {
    return this.http.get(`${this.baseUrl}receiver`);
  }

  async getMessageBySender(): Promise<any> {
    return this.http.get(`${this.baseUrl}sender`);
  }

  async getAllMessages(): Promise<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
