import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Auth } from '../services/auth/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: Auth, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.verifySession().pipe(
      take(1),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true; // Permitir acceso a rutas protegidas
        }
        // Redirigir al login si no está autenticado
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      })
    );
  }
}
