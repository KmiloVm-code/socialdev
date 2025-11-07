import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { User } from '../../../../core/models/user';

@Component({
  selector: 'app-user-info',
  standalone: false,
  templateUrl: './user-info.html',
  styleUrl: './user-info.css'
})
export class UserInfo implements OnChanges {
  @Input() user: User | null = null;
  @Output() editProfile = new EventEmitter<void>();

  avatarUrl: string = '';
  defaultAvatar: string = 'https://ui-avatars.com/api/?name=User&background=007BFF&color=fff&size=200';

  ngOnChanges() {
    if (this.user) {
      const userName = this.user.name || 'User';
      this.defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=007BFF&color=fff&size=200`;
      this.avatarUrl = this.user.avatar || this.defaultAvatar;
    }
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultAvatar;
  }

  onEditProfile() {
    this.editProfile.emit();
  }
}
