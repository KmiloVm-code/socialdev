import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: ApiService) {}

  getAll(): Observable<User[]> {
    return this.api.get<User[]>('/users');
  }

  getById(id: string): Observable<User> {
    return this.api.get<User>(`/users/me`);
  }

  updateUser(id: string, data: Partial<User>): Observable<User> {
    return this.api.put<User>(`/users/${id}`, data as JSON);
  }
}
