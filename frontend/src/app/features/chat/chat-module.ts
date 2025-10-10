import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing-module';
import { Chat } from './chat';
import { ChatList } from './components/chat-list/chat-list';
import { ChatRoom } from './components/chat-room/chat-room';


@NgModule({
  declarations: [
    Chat,
    ChatList,
    ChatRoom
  ],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
