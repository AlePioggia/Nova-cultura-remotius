import { WebsocketService } from './../../../src/chat/services/web-socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.css'],
})
export class NotificationPanelComponent implements OnInit {
  notifications: any[] = [];

  constructor(private webSocketService: WebsocketService) {}

  ngOnInit(): void {
    this.webSocketService
      .onNotificationReceived()
      .subscribe((notification: any) => {
        this.notifications.push(notification);
        console.log(notification);
      });
  }
}
