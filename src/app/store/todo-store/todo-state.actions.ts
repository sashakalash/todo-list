import { ITodoListItem } from 'src/app/core/interfaces/todo-list-item.interface';

export enum TodoActionsTypes {
  ADD_ONE = '[TodoList] Add TodoItem',
  UPDATE_ONE = '[TodoList] Edit TodoItem',
  REMOVE_ONE = '[TodoList] Remove TodoItem',
  CHANGE_PANEL_VISIBILITY = '[TodoList] Change Todo Panel Visibility',
  SET_CURRENT_USER = '[TodoList] Set Current User',
  SET_CURRENT_TODO_ITEM = '[TodoList] Set Current Todo Item',
}
export namespace TodoPanelActions {
  export class ChangePanelVisibility {
    static readonly type = TodoActionsTypes.CHANGE_PANEL_VISIBILITY;
    constructor(public payload: boolean) {}
  }
}

export namespace CommonTodoActions {
  export class AddTodoItem {
    static readonly type = TodoActionsTypes.ADD_ONE;
    constructor(public payload: ITodoListItem) {}
  }

    export class EditTodoItem {
    static readonly type = TodoActionsTypes.UPDATE_ONE;
    constructor(public payload: ITodoListItem) {}
  }

  export class RemoveTodoItem {
    static readonly type = TodoActionsTypes.REMOVE_ONE;
    constructor(public payload: {id: number}) {}
  }

  export class SetCurrentUser {
    static readonly type = TodoActionsTypes.SET_CURRENT_USER;
    constructor(public user: string) {}
  }
  export class SetCurrentTodoItem {
    static readonly type = TodoActionsTypes.SET_CURRENT_TODO_ITEM;
    constructor(public todo: ITodoListItem | null) {}
  }
}
