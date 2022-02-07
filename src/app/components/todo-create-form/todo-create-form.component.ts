import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ITodoListItem } from 'src/app/core/models/todo-list-item.interface';

import { TodoStatusEnum } from 'src/app/core/models/todo-status.enum';
import * as fromRoot from 'src/app/store';
@Component({
  selector: 'cmp-todo-create-form',
  templateUrl: './todo-create-form.component.html',
  styleUrls: ['./todo-create-form.component.scss']
})
export class TodoCreateFormComponent implements OnInit {
  public form: FormGroup;

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
  }

  private closePanel(): void {
    this.store.dispatch(new fromRoot.TodoState.TodoPanelActions.ChangePanelVisibility());
  }

  ngOnInit(): void {
    console.log()
  }

  public cancel(): void {
    this.closePanel();
  }

  public create(): void {
    this.store.dispatch(new fromRoot.TodoState.TodoActions.Add(this.form.value as ITodoListItem));
    this.closePanel();
  }
}
