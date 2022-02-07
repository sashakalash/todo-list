import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthStateSelectors } from 'src/app/store/auth-store/auth-state.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(private store: Store,
    private router: Router) {}

  canActivateChild(): boolean {
    if (this.store.selectSnapshot(AuthStateSelectors.isAuthenticated)) {
      return true;
    }
    /** TODO уведомление о необходимости авторизоваться */
    this.router.navigateByUrl('login');
    return false;
  }
}
