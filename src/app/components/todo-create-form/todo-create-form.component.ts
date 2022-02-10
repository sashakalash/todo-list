import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Store } from '@ngxs/store';
import { filter, Subject, takeUntil, tap } from 'rxjs';
import { ITodoListItem } from 'src/app/core/models/todo-list-item.interface';

import { TodoStatusEnum } from 'src/app/core/models/todo-status.enum';
import * as fromRoot from 'src/app/store';
@Component({
  selector: 'cmp-todo-create-form',
  templateUrl: './todo-create-form.component.html',
  styleUrls: ['./todo-create-form.component.scss']
})
export class TodoCreateFormComponent implements OnDestroy {

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      createdAt: [{ value: new Date(), disabled: true }],
      deadline: ['', Validators.required],
      status: [{ value: TodoStatusEnum.CREATED, disabled: true }]
    });
    this.store.select(fromRoot.TodoState.CommonTodoStateSelectors.selectCurrentUser)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(user => this.currentUser = user);
    this.store.select(fromRoot.TodoState.CommonTodoStateSelectors.selectCurrentTodoItem)
      .pipe(
        takeUntil(this.destroyed$),
        filter(v => !!v),
        tap(() => this.isEdit = true)
      )
      .subscribe(item => this.fillForm(item));
    this.form.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.store.dispatch(new fromRoot.FormState.FormActions.TouchedStatusChanged(this.form.untouched)));
  }

  public form: FormGroup;
  private currentUser: string;
  private destroyed$ = new Subject<void>();
  public readonly STATUSES = Object.keys(TodoStatusEnum);
  public isEdit: boolean;

  private closePanel(): void {
    this.form.reset();
    this.store.dispatch(new fromRoot.TodoState.TodoPanelActions.ChangePanelVisibility());
  }

  private fillForm(item: ITodoListItem): void {
    this.form.setValue(item);
    this.form.get('status')?.enable();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public cancel(): void {
    this.closePanel();
  }

  public save(): void {
    this.isEdit
      ? this.store.dispatch(new fromRoot.TodoState.CommonTodoActions.EditTodoItem(this.form.getRawValue() as ITodoListItem))
      : this.store.dispatch(new fromRoot.TodoState.CommonTodoActions.AddTodoItem(this.form.getRawValue() as ITodoListItem));
    this.closePanel();
  }
}
