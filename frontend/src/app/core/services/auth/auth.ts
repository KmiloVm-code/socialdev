import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api';
import { Auth as AuthModel } from '../../models/auth';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private apiService: ApiService) {}

  login(email: string, password: string): Observable<AuthModel> {
    console.log('AuthService login called with:', email, password);
    return this.apiService.post<AuthModel>('/auth/login', { email, password });
  }

  logout(): Observable<void> {
    return this.apiService.post<void>('/auth/logout', {});
  }

  getCurrentUser(): Observable<User> {
    return this.apiService.get<User>('/auth/me');
  }
}
