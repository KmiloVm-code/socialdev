import { Component, Input, OnChanges } from '@angular/core';
import { User } from '../../../../core/models/user';

@Component({
  selector: 'app-developer-card',
  standalone: false,
  templateUrl: './developer-card.html',
  styleUrl: './developer-card.css'
})
export class DeveloperCard implements OnChanges {
  @Input() user: User | null = null;

  avatarUrl: string = '';
  defaultAvatar: string = 'https://ui-avatars.com/api/?name=User&background=007BFF&color=fff&size=150';

  ngOnChanges() {
    if (this.user) {
      const userName = this.user.name || 'User';
      this.defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=007BFF&color=fff&size=150`;
      this.avatarUrl = this.user.avatar || this.defaultAvatar;
    }
  }

  onAvatarError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultAvatar;
  }
}
