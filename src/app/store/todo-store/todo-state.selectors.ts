import { Selector } from '@ngxs/store';
import { ITodoListItem } from '../../core/models/todo-list-item.interface';
import { CommonTodoListState, CommonTodoStateModel, TodoStateModel } from './todo.state';
export class CommonTodoStateSelectors {

  @Selector([CommonTodoListState])
  static selectTodos(state: CommonTodoStateModel): ITodoListItem[] {
    return state.commonTodos.find((item: TodoStateModel) => item.user === state.currentUser)?.todoList ?? [];
  }

  @Selector([CommonTodoListState])
  static selectPanelState(state: CommonTodoStateModel): boolean {
    return state.isPanelOpen;
  }

  @Selector([CommonTodoListState])
  static selectCurrentUser(state: CommonTodoStateModel): string {
    return state.currentUser;
  }

  @Selector([CommonTodoListState])
  static selectCurrentTodoItem(state: CommonTodoStateModel): ITodoListItem {
    return state.currentTodoItem;
  }
}
