import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _showNotifications = new Subject<boolean>();
  showNotifications$ = this._showNotifications.asObservable();

  toggleNotifications() {
    this._showNotifications.next(true);
  }

  closeNotifications() {
    this._showNotifications.next(false);
  }
}
