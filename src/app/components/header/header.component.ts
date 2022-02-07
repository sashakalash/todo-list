import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as fromRoot from 'src/app/store';

@Component({
  selector: 'cmp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public router: Router,
    public store: Store) {}

  public isAdmin$: Observable<boolean> | undefined;

  ngOnInit(): void {
    this.isAdmin$ = this.store.select(fromRoot.AuthState.AuthStateSelectors.isAdmin)
  }

  public logout(): void {
    this.store.dispatch(new fromRoot.AuthState.AuthActions.Logout());
    this.router.navigate(['login']);
  }

  public showPanel(): void {
    this.store.dispatch(new fromRoot.TodoState.TodoPanelActions.ChangePanelVisibility());
  }

}
