import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthStateSelectors } from 'src/app/store/auth-store/auth-state.selectors';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store) {}

  canActivate(): boolean {
    return this.store.selectSnapshot(AuthStateSelectors.isAuthenticated);
  }
}
