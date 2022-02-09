import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';

import * as fromRoot from 'src/app/store'

@Component({
  selector: 'cmp-content-wrapper',
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.scss']
})
export class ContentWrapperComponent {

  constructor(
    public store: Store,
  ) {
    this.isOpen$ = this.store.select(fromRoot.TodoState.CommonTodoStateSelectors.selectPanelState)
  }

  public isOpen$: Observable<boolean>;

}
