import { IAuth } from '../../core/interfaces/auth.interface';

export enum AuthActionsTypes {
  LOGIN = '[Auth] Login',
  LOGOUT = '[Auth] LogOut',
  SET_CURRENT_USER = '[Auth] Set Current User',
}

export namespace AuthActions {
  export class Login {
    static readonly type = AuthActionsTypes.LOGIN;
    constructor(public payload: IAuth) {}
  }

  export class Logout {
    static readonly type = AuthActionsTypes.LOGOUT;
  }

  export class SetCurrentUser {
    static readonly type = AuthActionsTypes.SET_CURRENT_USER;
    constructor(public user: string) {}
  }
}
