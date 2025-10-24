import { Component, Input } from '@angular/core';
import { User } from '../../../../core/models/user';

@Component({
  selector: 'app-user-info',
  standalone: false,
  templateUrl: './user-info.html',
  styleUrl: './user-info.css'
})
export class UserInfo {
  @Input() user: User | null = null;
}
