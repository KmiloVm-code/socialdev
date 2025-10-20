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

  login(email: string, password: string, withCredentials = true): Observable<AuthModel> {
    console.log('AuthService login called with:', email, password);
    return this.apiService.post<AuthModel>('/auth/login', { email, password }, withCredentials);
  }

  logout(withCredentials = true): Observable<void> {
    return this.apiService.post<void>('/auth/logout', {}, withCredentials);
  }

  getCurrentUser(withCredentials = true): Observable<User> {
    return this.apiService.get<User>('/auth/me', withCredentials);
  }
}
