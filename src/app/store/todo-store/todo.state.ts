import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { ITodoListItem } from '../../core/models/todo-list-item.interface';
import { CommonTodoActions, TodoPanelActions } from './todo-state.actions';
import { patch, removeItem, insertItem, updateItem } from '@ngxs/store/operators';

const TODOS_STATE_TOKEN = new StateToken<TodoStateModel>('todos');
const COMMON_TODOS_STATE_TOKEN = new StateToken<CommonTodoStateModel>('commonTodos');
export interface TodoStateModel {
  user: string;
  todoList: ITodoListItem[];
}
@State<TodoStateModel>({
  name: TODOS_STATE_TOKEN,
  defaults: {
    user: '',
    todoList: []
  }
})

@Injectable()
export class TodoListState {

}
export interface CommonTodoStateModel {
  isPanelOpen: boolean;
  commonTodos: TodoStateModel[];
  currentUser: string;
  currentTodoItem: ITodoListItem;
}
@State<CommonTodoStateModel>({
  name: COMMON_TODOS_STATE_TOKEN,
  defaults: {
    commonTodos: [],
    isPanelOpen: false,
    currentUser: '',
    currentTodoItem: null as any
  },
  children: [TodoListState]
})

@Injectable()
export class CommonTodoListState {

  @Action(CommonTodoActions.RemoveTodoItem)
  removeTodoItem(ctx: StateContext<CommonTodoStateModel>, { payload }: CommonTodoActions.RemoveTodoItem): void {
    const state = ctx.getState();
    ctx.setState(patch({
      commonTodos: updateItem<TodoStateModel>(
        item => item?.user === state.currentUser,
        patch({
          todoList: removeItem<ITodoListItem>(item => item?.id === payload.id)
        })
      )
    }));
  }

  @Action(CommonTodoActions.EditTodoItem)
  editTodoItem(ctx: StateContext<CommonTodoStateModel>, { payload }: CommonTodoActions.EditTodoItem): void {
    const state = ctx.getState();
    ctx.setState(patch({
      commonTodos: updateItem<TodoStateModel>(
        item => item?.user === state.currentUser,
        patch({
          todoList: updateItem<ITodoListItem>(
            item => item?.id === payload.id,
            patch(payload)
          )
        })
      )
    }));
  }

  @Action(CommonTodoActions.addTodoItem)
  addTodoItem(ctx: StateContext<CommonTodoStateModel>, { payload }: CommonTodoActions.addTodoItem): void {
    const state = ctx.getState();
    const existingUser = state.commonTodos.find(item => item.user === state.currentUser);
    if (!existingUser) {
      ctx.setState(patch({
        commonTodos: insertItem<TodoStateModel>({
          user: state.currentUser,
          todoList: [payload]
        }),
      }));
    } else {
      ctx.setState(patch({
        commonTodos: updateItem<TodoStateModel>(
          item => item?.user === state.currentUser,
          patch({
            todoList: insertItem<ITodoListItem>(payload)
          })
        )
      }));
    }
  }

  @Action(CommonTodoActions.SetCurrentUser)
  setCurrentUser(ctx: StateContext<CommonTodoStateModel>, { user }: CommonTodoActions.SetCurrentUser): void {
    ctx.setState(patch({
      currentUser: user
    }));
  }

  @Action(TodoPanelActions.ChangePanelVisibility)
  changeTodoPanelVisibilityStatus(ctx: StateContext<CommonTodoStateModel>): void {
    const state = ctx.getState();
    ctx.setState(patch({
      isPanelOpen: !state.isPanelOpen
    })
    );
  }

  @Action(CommonTodoActions.SetCurrentTodoItem)
  setCurrentTodoItem(ctx: StateContext<CommonTodoStateModel>, { todo }: CommonTodoActions.SetCurrentTodoItem): void {
    ctx.setState(patch({
      currentTodoItem: todo
    }));
  }
}
