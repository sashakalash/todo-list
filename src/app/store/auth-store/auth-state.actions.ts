import { IAuth } from './../../core/models/auth.interface';

export enum AuthActionsTypes {
  LOGIN = '[Auth] Login',
  LOGOUT = '[Auth] LogOUT'
}

export namespace AuthActions {
  export class Login {
    static readonly type = AuthActionsTypes.LOGIN;
    constructor(public payload: IAuth) {}
  }

  export class Logout {
    static readonly type = AuthActionsTypes.LOGOUT;
  }
}
