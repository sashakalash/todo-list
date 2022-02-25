import { Store } from '@ngxs/store';
import { IAuth } from '../../core/interfaces/auth.interface';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as fromRoot from 'src/app/store';

@Component({
  selector: 'cmp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  public onSubmit(): void {
    const value: IAuth = this.form.value;
    this.store.dispatch(new fromRoot.AuthState.AuthActions.Login(value));
    this.store.dispatch(new fromRoot.TodoState.CommonTodoActions.SetCurrentUser(value.login))
    this.router.navigate(['todos']);
  }

}
