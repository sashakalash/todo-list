import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IToken } from '../interfaces/token.interface';
import { IAuth } from '../interfaces/auth.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(credentials: IAuth): Observable<IToken> {
    return credentials.password.includes('admin') ? of({ token: 'admin' }) : of({ token: 'user' });
  }

  logout(): void {

  }
}
