import { ITodoListItem } from 'src/app/core/models/todo-list-item.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as fromRoot from 'src/app/store';
@Component({
  selector: 'cmp-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  constructor(public store: Store) {}

  @Input() item: ITodoListItem;

  public remove(id: number): void {
    this.store.dispatch(new fromRoot.TodoState.CommonTodoActions.RemoveTodoItem({ id }));
  }

  public edit(item: ITodoListItem): void {
    this.store.dispatch(new fromRoot.TodoState.CommonTodoActions.SetCurrentTodoItem(item));
    this.store.dispatch(new fromRoot.TodoState.TodoPanelActions.ChangePanelVisibility(true));
  }
}
