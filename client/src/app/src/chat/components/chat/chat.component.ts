import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { IChatMessage } from 'src/app/interfaces/chat-message.interface';
import { AuthenticationService } from 'src/app/src/login/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../services/web-socket.service';
import { DxScrollViewComponent } from 'devextreme-angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: IChatMessage[] = [];
  newMessage = '';
  currentUser: string;
  otherUser: string;
  private subscription: Subscription;
  @ViewChild('scrollView', { static: false }) scrollView: DxScrollViewComponent;

  constructor(
    private chatService: ChatService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private websocketService: WebsocketService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.otherUser = params['email'];
    });
  }

  async ngOnInit() {
    const user: any = await this.authenticationService.getAllUserInformations();
    this.currentUser = user.mail;
    await this.loadMessages();
    this.subscribeToMessages();
  }

  async loadMessages() {
    await this.chatService.getMessageByReceiver(this.otherUser).then((data) => {
      this.messages.push(...data);
    });

    await this.chatService.getMessageBySender(this.otherUser).then((data) => {
      this.messages.push(...data);
    });

    this.messages.sort((a, b) => {
      if (a.timeStamp > b.timeStamp) return 1;
      if (a.timeStamp < b.timeStamp) return -1;
      return 0;
    });
    this.scrollToBottom();
  }

  sendMessage() {
    const messagePayload = {
      senderMail: this.currentUser,
      receiverMail: this.otherUser,
      message: this.newMessage,
      timestamp: new Date(),
    };
    this.websocketService.sendMessage('privateMessage', messagePayload);
    this.websocketService.sendNotification(
      this.otherUser,
      '1 messaggio in arrivo da ' + this.currentUser + '!'
    );
    this.messages.push(messagePayload);
    this.newMessage = '';
    this.scrollToBottom();
  }

  subscribeToMessages() {
    this.subscription = this.websocketService
      .onMessage('receivePrivateMessage')
      .subscribe((message: IChatMessage) => {
        this.messages.push(message);
        this.sortMessages();
      });

    this.scrollToBottom();
  }

  sortMessages() {
    this.messages.sort(
      (a, b) =>
        new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime()
    );
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const scrollInstance = this.scrollView.instance;
      const scrollHeight = scrollInstance.scrollHeight();
      scrollInstance.scrollTo(scrollHeight);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.websocketService.closeConnection();
  }
}
