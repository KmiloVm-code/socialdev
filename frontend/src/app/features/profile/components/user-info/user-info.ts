import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../core/models/user';

@Component({
  selector: 'app-user-info',
  standalone: false,
  templateUrl: './user-info.html',
  styleUrl: './user-info.css'
})
export class UserInfo {
  @Input() user: User | null = null;
  @Output() editProfile = new EventEmitter<void>();

  onEditProfile() {
    this.editProfile.emit();
  }
}
