import { trigger, state, style, transition } from '@angular/animations';
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import * as fromRoot from 'src/app/store';
@Component({
  selector: 'cmp-content-wrapper',
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' })
      ])
    ])
  ]
})
export class ContentWrapperComponent {

  constructor(public store: Store) {
    this.isPanelOpen$ = this.store.select(fromRoot.TodoState.CommonTodoStateSelectors.selectPanelState)
  }

  public isPanelOpen$: Observable<boolean>;

}
