import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { fromEvent, Observable } from 'rxjs';

import * as fromRoot from 'src/app/store';
@Component({
  selector: 'cmp-slide-panel',
  templateUrl: './slide-panel.component.html',
  styleUrls: ['./slide-panel.component.scss'],

})
export class SlidePanelComponent {

  @ViewChild('panel') set panelRef(ref: ElementRef) {
    if (ref) {
      this.panelEl = ref;
      this.subscribePanelClick();
    }
  }

  constructor(
    public store: Store,
  ) {
  }

  public isOpen$: Observable<boolean>;
  private panelEl: ElementRef;

  private subscribePanelClick() {
    if (this.panelEl) {
      (fromEvent(this.panelEl.nativeElement as HTMLElement, 'click')).
        subscribe(() => this.closePanel());
    }
  }

  private closePanel(): void {
    this.store.dispatch(new fromRoot.TodoState.TodoPanelActions.ChangePanelVisibility(false));
  }
}
