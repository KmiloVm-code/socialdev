import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-item',
  standalone: false,
  templateUrl: './chat-item.html',
  styleUrl: './chat-item.css'
})
export class ChatItem {
  avatarUrl: string = 'https://ui-avatars.com/api/?name=John+Doe&background=007BFF&color=fff&size=100';
  defaultAvatar: string = 'https://ui-avatars.com/api/?name=User&background=007BFF&color=fff&size=100';

  onAvatarError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultAvatar;
  }
}
