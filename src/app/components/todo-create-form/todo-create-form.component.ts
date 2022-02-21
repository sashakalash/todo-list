import { ToastComponent } from 'src/app/components/toast/toast.component';
import { INotificationData } from 'src/app/core/models/notification-data.interface';
import { Component, OnDestroy, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Store } from '@ngxs/store';
import { filter, map, Observable, Subject, takeUntil, tap, switchMap, withLatestFrom, fromEvent, iif, shareReplay, distinctUntilChanged, take } from 'rxjs';
import { ITodoListItem } from 'src/app/core/models/todo-list-item.interface';

import { TodoStatusEnum } from 'src/app/core/models/todo-status.enum';
import { FormService } from 'src/app/core/services/form.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import * as fromRoot from 'src/app/store';
@Component({
  selector: 'cmp-todo-create-form',
  templateUrl: './todo-create-form.component.html',
  styleUrls: ['./todo-create-form.component.scss'],
  providers: [FormService]
})
export class TodoCreateFormComponent implements OnDestroy {

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private notificationService: NotificationService,
    private formService: FormService,
  ) {
    this.form = this.formService.createForm();
    this.setSubscriptions();
  }

  @ViewChild('saveBtn') set saveBtnRef({ _elementRef }: MatButton) {
    this._saveBtnRef = _elementRef;
    this.setSaveBtnSubscription();
  }

  public form: FormGroup;
  private currentUser: string;
  private destroyed$ = new Subject<void>();
  public readonly STATUSES = Object.keys(TodoStatusEnum);
  public isEdit: boolean;
  private _saveBtnRef: ElementRef;

  private setSaveBtnSubscription(): void {
    if (this._saveBtnRef) {
      fromEvent(this._saveBtnRef.nativeElement as HTMLElement, 'click').pipe(
        takeUntil(this.destroyed$),
        switchMap(() => iif(
          () => this.isEdit,
          this.store.dispatch(new fromRoot.TodoState.CommonTodoActions.EditTodoItem(this.form.getRawValue() as ITodoListItem)),
          this.store.dispatch(new fromRoot.TodoState.CommonTodoActions.AddTodoItem(this.form.getRawValue() as ITodoListItem))
        )),
      ).subscribe(() => { this.showNotification(); this.closePanel(); });
    }
  }

  private setSubscriptions(): void {

    this.store.select(fromRoot.TodoState.CommonTodoStateSelectors.selectCurrentUser)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(user => this.currentUser = user);

    this.store.select(fromRoot.TodoState.CommonTodoStateSelectors.selectCurrentTodoItem)
      .pipe(
        takeUntil(this.destroyed$),
        filter(v => !!v),
        take(1),
    ).subscribe(item => {

      console.log(item)
        this.fillForm(item);
        this.isEdit = true;
      });
  }

  private closePanel(): void {
    this.form.reset();
    this.store.dispatch(new fromRoot.TodoState.TodoPanelActions.ChangePanelVisibility());
  }

  private fillForm(item: ITodoListItem): void {
    this.form.setValue(item);
    this.form.get('status')?.enable();
  }

  private showNotification(): void {
    const data: INotificationData = { delay: 3000, text: this.isEdit ? 'Successfully Saved!' : 'Successfully Created!' };
    this.notificationService.showNotification(ToastComponent, data);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public cancel(): void {
    this.closePanel();
  }
}
