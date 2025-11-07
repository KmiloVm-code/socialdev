import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { ApiService } from '../api';
import { Auth as AuthModel } from '../../models/auth';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private sessionChecked = new ReplaySubject<boolean>(1);
  public sessionChecked$ = this.sessionChecked.asObservable();

  constructor(private apiService: ApiService) {
    // Intentar restaurar sesión al iniciar
    this.verifySession().subscribe();
  }

  register(name: string, email: string, password: string, withCredentials = true): Observable<any> {
    return this.apiService
      .post<any>('/auth/register', { name, email, password }, withCredentials)
      .pipe(
        tap((response) => {
          // El registro no inicia sesión automáticamente según el backend
          this.sessionChecked.next(true);
        })
      );
  }

  login(email: string, password: string, withCredentials = true): Observable<AuthModel> {
    return this.apiService
      .post<AuthModel>('/auth/login', { email, password }, withCredentials)
      .pipe(
        tap((auth) => {
          this.currentUserSubject.next(auth.user);
          this.sessionChecked.next(true);
        })
      );
  }

  logout(withCredentials = true): Observable<void> {
    return this.apiService.post<void>('/auth/logout', {}, withCredentials).pipe(
      tap(() => {
        this.currentUserSubject.next(null);
        this.sessionChecked.next(true);
      })
    );
  }

  getCurrentUser(withCredentials = true): Observable<User> {
    return this.apiService.get<User>('/auth/me', withCredentials).pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
      })
    );
  }

  verifySession(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      map((user) => {
        this.currentUserSubject.next(user);
        this.sessionChecked.next(true);
        return true;
      }),
      catchError(() => {
        this.currentUserSubject.next(null);
        this.sessionChecked.next(true);
        return of(false);
      })
    );
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }
}
