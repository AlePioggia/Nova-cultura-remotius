import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { IChatMessage } from 'src/app/interfaces/chat-message.interface';
import { AuthenticationService } from 'src/app/src/login/services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messages: IChatMessage[] = [];
  newMessage = '';
  currentUser: string; // Mocked current user, in a real app you'll fetch this info
  otherUser: string;

  constructor(
    private chatService: ChatService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.otherUser = params['email'];
    });
  }

  async ngOnInit() {
    const user: any = await this.authenticationService.getAllUserInformations();
    this.currentUser = user.mail;
    await this.loadMessages();
  }

  async loadMessages() {
    await this.chatService.getMessageByReceiver(this.otherUser).then((data) => {
      this.messages.push(...data);
    });

    await this.chatService.getMessageBySender(this.otherUser).then((data) => {
      this.messages.push(...data);
    });

    // Sorting messages by timeStamp
    this.messages.sort((a, b) => {
      if (a.timeStamp > b.timeStamp) return 1;
      if (a.timeStamp < b.timeStamp) return -1;
      return 0;
    });
  }

  sendMessage() {
    // Send message logic here...
    this.newMessage = '';
  }
}
