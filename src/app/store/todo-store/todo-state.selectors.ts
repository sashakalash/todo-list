import { Selector } from '@ngxs/store';
import { ITodoListItem } from '../../core/models/todo-list-item.interface';
import { TodoListState, TodoStateModel } from './todo.state';

export class TodoStateSelectors {

  @Selector([TodoListState])
  static selectAllTodos(state: TodoStateModel): ITodoListItem[] {
    return state.todoList;
  }

  @Selector([TodoListState])
  static selectTodoItem(state: TodoStateModel, idx: number): ITodoListItem | undefined {
    return state.todoList.find(i => i.id === idx);
  }
}
