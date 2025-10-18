import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user/user';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getById('68e6f883e8c8b3105d0f2388').subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }
}
