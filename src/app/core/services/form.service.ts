import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { from, takeUntil } from 'rxjs';
import { ITodoListItem } from '../models/todo-list-item.interface';
import { TodoStatusEnum } from '../models/todo-status.enum';
import * as fromRoot from 'src/app/store';

@Injectable()
export class FormService {

  constructor(private fb: FormBuilder,
    private store: Store,) {

  }

  public createForm(): FormGroup {
    const form = this.fb.group({
      title: ['', Validators.required],
      createdAt: [{ value: new Date(), disabled: true }],
      deadline: ['', Validators.required],
      status: [{ value: TodoStatusEnum.CREATED, disabled: true }]
    });

    form.valueChanges
      .subscribe(() => this.store.dispatch(new fromRoot.TodoState.CommonTodoActions.SetCurrentTodoItem(form.getRawValue() as ITodoListItem)));

    form.valueChanges
      .subscribe(() => this.store.dispatch(new fromRoot.FormState.FormActions.TouchedStatusChanged(form.untouched)));

    return form;
  }

}
