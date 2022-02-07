import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import * as fromRoot from 'src/app/store'

@Component({
  selector: 'cmp-content-wrapper',
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.scss']
})
export class ContentWrapperComponent implements OnInit {

  constructor(
    public store: Store,
  ) {}

  public isOpen$: Observable<boolean> | undefined;

  ngOnInit(): void {
    this.isOpen$ = this.store.select(fromRoot.TodoState.TodoStateSelectors.selectPanelState)
  }

}
