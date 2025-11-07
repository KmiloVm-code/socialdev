import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api';
import { User, Project } from '../../models/user';

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
    return this.api.put<User>(`/users/`, data as JSON);
  }

  addProject(userId: string, project: Project): Observable<User> {
    return this.api.post<User>(`/users/projects`, project as unknown as JSON);
  }
}
