import { Selector } from '@ngxs/store';
import { AuthState, AuthStateModel } from './auth.state';

export class AuthStateSelectors {

  @Selector([AuthState])
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector([AuthState])
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Selector([AuthState])
  static isAdmin(state: AuthStateModel): boolean {
    return !!state.token?.includes('admin');
  }

  @Selector([AuthState])
  static selectUserName(state: AuthStateModel): string {
    return state.currentUser ?? 'Guest';
  }

  @Selector([AuthState])
  static selectAllUsers(state: AuthStateModel): string[] {
    return state.users ?? [];
  }
}
