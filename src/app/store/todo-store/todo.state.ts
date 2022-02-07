import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { ITodoListItem } from '../../core/models/todo-list-item.interface';
import { TodoActions, TodoPanelActions } from './todo-state.actions';
import { patch, removeItem, insertItem, updateItem } from '@ngxs/store/operators';
import { HEROES } from 'src/app/heroes';

const TODOS_STATE_TOKEN = new StateToken<ITodoListItem[]>('todos');

export interface TodoStateModel {
  todoList: ITodoListItem[];
  isPanelOpen: boolean;
}

@State<TodoStateModel>({
  name: TODOS_STATE_TOKEN,
  defaults: {
    todoList: HEROES,
    isPanelOpen: false
  }
})

@Injectable()
export class TodoListState {
  @Action(TodoActions.Add)
  addTodoItemToList(ctx: StateContext<TodoStateModel>, { payload }: TodoActions.Add): void {
    ctx.setState(patch({
      todoList: insertItem(payload)
    }));
  }

  @Action(TodoActions.Remove)
  removeTodoItemFromList(ctx: StateContext<TodoStateModel>, { payload }: TodoActions.Remove): void {
    ctx.setState(patch({
      todoList: removeItem<ITodoListItem>(item => item?.id === payload.id)
    }));
  }

  @Action(TodoActions.Add)
  editTodoItemToList(ctx: StateContext<TodoStateModel>, { payload }: TodoActions.Add): void {
    ctx.setState(patch({
      todoList: updateItem<ITodoListItem>(item => item?.id === payload.id, payload)
    }));
  }

  @Action(TodoPanelActions.ChangePanelVisibility)
  changeTodoPanelVisibilityStatus(ctx: StateContext<TodoStateModel>): void {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isPanelOpen: !state.isPanelOpen
    });
  }
}
