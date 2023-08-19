import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './components/chat/chat.component';
import {
  DxTextBoxModule,
  DxButtonModule,
  DxScrollViewModule,
} from 'devextreme-angular';

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    DxTextBoxModule,
    DxButtonModule,
    DxScrollViewModule,
  ],
})
export class ChatModule {}
