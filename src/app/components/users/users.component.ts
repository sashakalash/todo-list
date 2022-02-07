import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';

import * as fromRoot from 'src/app/store';

@Component({
  selector: 'cmp-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(public store: Store) {}

  public users$!: Observable<string[]>;
  public isCurrentUser$!: Observable<boolean>;

  ngOnInit(): void {
    this.users$ = this.store.select(fromRoot.AuthState.AuthStateSelectors.selectAllUsers)
  }

}
