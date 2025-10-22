import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Auth } from '../services/auth/auth';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  constructor(private authService: Auth, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.verifySession().pipe(
      take(1),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          // Si está autenticado, redirigir al feed
          this.router.navigate(['/feed']);
          return false;
        }
        // Permitir acceso a rutas públicas (login/register)
        return true;
      })
    );
  }
}
