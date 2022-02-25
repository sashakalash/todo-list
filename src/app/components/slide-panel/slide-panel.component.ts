import { NotificationService } from 'src/app/core/services/notification.service';
import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { fromEvent, Observable, Subject, takeUntil, withLatestFrom } from 'rxjs';

import * as fromRoot from 'src/app/store';
import { ConfirmationDialodComponent } from '../confirmation-dialod/confirmation-dialod.component';
@Component({
  selector: 'cmp-slide-panel',
  templateUrl: './slide-panel.component.html',
  styleUrls: ['./slide-panel.component.scss'],

})
export class SlidePanelComponent implements OnDestroy {

  @ViewChild('panel') set panelRef(ref: ElementRef) {
    if (ref) {
      this.panelEl = ref;
      this.subscribePanelClick();
    }
  }

  constructor(
    public store: Store,
    private notificationService: NotificationService,
  ) {
  }

  public isOpen$: Observable<boolean>;
  private panelEl: ElementRef;
  private destroyed$ = new Subject<void>();

  private subscribePanelClick() {
    if (this.panelEl) {
      (fromEvent(this.panelEl.nativeElement as HTMLElement, 'click'))
        .pipe(
          takeUntil(this.destroyed$),
          withLatestFrom(this.store.select(fromRoot.FormState.FormStateSelectors.selectTouchedStatus))
      )
        .subscribe(([e, touched]: [Event, boolean]) => {
          if (touched) {
            this.notificationService.showConfirmationDialog(ConfirmationDialodComponent, { text: 'Вы действтительно хотите закрыть форму?' });
          } else {
            this.closePanel();
          }
        });
    }
  }

  private closePanel(): void {
    this.store.dispatch(new fromRoot.TodoState.TodoPanelActions.ChangePanelVisibility(false));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
