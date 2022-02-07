import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { IAuth } from 'src/app/core/models/auth.interface';
import { AuthActions } from './auth-state.actions';
import { Observable, tap } from 'rxjs';
import { IToken } from 'src/app/core/models/token.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { USERS } from 'src/app/heroes';

const TODOS_STATE_TOKEN = new StateToken<IAuth>('auth');

export interface AuthStateModel {
  token: string | null;
  currentUser: string | null;
  users: string[];
}

@State<AuthStateModel>({
  name: TODOS_STATE_TOKEN,
  defaults: {
    token: null,
    currentUser: null,
    users: USERS
  }
})

@Injectable()
export class AuthState {

  constructor(private authService: AuthService) {}

  @Action(AuthActions.Login)
  login(ctx: StateContext<AuthStateModel>, { payload }: AuthActions.Login): Observable<IToken> {
    return this.authService.login(payload).pipe(
      tap((result: IToken) => {
        ctx.patchState({
          token: result.token,
          currentUser: payload.login,
          users: USERS
        });
      })
    );
  }

  @Action(AuthActions.Logout)
  logout(ctx: StateContext<AuthStateModel>): void {
    this.authService.logout();
    ctx.setState({
      token: null,
      currentUser: null,
      users: USERS
    });
  }
}

