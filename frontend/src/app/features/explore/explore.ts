import { Component } from '@angular/core';
import { User } from '../../core/models/user';
import { UserService } from '../../core/services/user/user';
import { Auth } from '../../core/services/auth/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-explore',
  standalone: false,
  templateUrl: './explore.html',
  styleUrl: './explore.css',
})
export class Explore {
  users: User[] = [];
  currentUser$: Observable<User | null>;

  constructor(private userService: UserService, private authService: Auth) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit() {
    this.userService.getAll().subscribe((data: User[]) => {
      this.currentUser$.subscribe(currentUser => {
        data = data.filter(user => user._id !== currentUser?._id);
        this.users = data;
      });
    });
  }
}
