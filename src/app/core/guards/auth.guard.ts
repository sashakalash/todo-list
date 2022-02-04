import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthStateSelectors } from 'src/app/store/auth-store/auth-state.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store,
    private router: Router) {}

  canActivate(): boolean {
    if (this.store.selectSnapshot(AuthStateSelectors.isAuthenticated)) {
      return true;
    }
    /** TODO уведомление о необходимости авторизоваться */
    this.router.navigateByUrl('/');
    return false;
  }
}
