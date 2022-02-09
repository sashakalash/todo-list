import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import * as fromRoot from 'src/app/store';

@Component({
  selector: 'cmp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public router: Router,
    public store: Store) {
    this.isAdmin$ = this.store.select(fromRoot.AuthState.AuthStateSelectors.isAdmin)
  }

  public isAdmin$: Observable<boolean>;

  public logout(): void {
    this.store.dispatch(new fromRoot.AuthState.AuthActions.Logout());
    this.router.navigate(['login']);
  }

  public showPanel(): void {
    this.store.dispatch(new fromRoot.TodoState.TodoPanelActions.ChangePanelVisibility());
  }
}
