import { Component } from '@angular/core';
import { Auth } from '../../core/services/auth/auth';
import { User } from '../../core/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  currentUser$: Observable<User | null>;

  constructor(private auth: Auth) {
    this.currentUser$ = this.auth.currentUser$;
  }
}
