import { NotificationService } from '../../services/notification.service';
import { WebsocketService } from './../../../src/chat/services/web-socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.css'],
})
export class NotificationPanelComponent implements OnInit {
  notifications: any[] = [];

  constructor(
    private webSocketService: WebsocketService,
    private notificationService: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.notifications = await this.notificationService.getNotifications();
    this.webSocketService
      .onNotificationReceived()
      .subscribe((notification: any) => {
        this.notifications.push(notification.result.notificationContent);
      });
  }

  deleteNotification(notification: any) {
    const index = this.notifications.indexOf(notification);
    if (index > -1) {
      this.notifications.splice(index, 1);
    }
    this.notificationService.deleteNotification(notification.id);
  }

  handleNotificationClick(notification: any) {}
}
