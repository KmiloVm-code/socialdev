import { Component } from '@angular/core';
import { Auth } from '../../core/services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email: string = '';
  password: string = '';

  constructor(private authService: Auth, private router: Router) {}

  login(email: string, password: string) {
    this.authService.login(email, password).subscribe({
      next: (auth) => {
        this.router.navigate(['/feed']);
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }
}
