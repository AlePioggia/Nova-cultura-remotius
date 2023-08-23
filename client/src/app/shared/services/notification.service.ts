import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BASE_URL } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _showNotifications = new Subject<boolean>();
  showNotifications$ = this._showNotifications.asObservable();
  private baseUrl: string = '';

  constructor(private http: HttpClient) {
    this.baseUrl = BASE_URL + 'notification/';
  }

  toggleNotifications() {
    this._showNotifications.next(true);
  }

  closeNotifications() {
    this._showNotifications.next(false);
  }

  async getNotifications(): Promise<any> {
    return this.http.get(`${this.baseUrl}`).toPromise();
  }

  async createNotification(message: string) {
    return this.http.post(`${this.baseUrl}`, message);
  }

  async deleteNotification(id: string): Promise<any> {
    this.http.delete(`${this.baseUrl}${id}`).toPromise();
  }
}
