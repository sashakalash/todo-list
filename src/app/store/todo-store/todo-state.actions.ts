import { ITodoListItem } from '../core/models/todo-list-item.interface';

export enum TodoActionsTypes {
  ADD_ONE = '[TodoList] Add TodoItem',
  UPDATE_ONE = '[TodoList] Edit TodoItem',
  REMOVE_ONE = '[TodoList] Remove TodoItem',
  CHANGE_PANEL_VISIBILITY = '[TodoList] Change Todo Panel Visibility'
}

export namespace TodoActions {
  export class Add {
    static readonly type = TodoActionsTypes.ADD_ONE;
    constructor(public payload: ITodoListItem) {}
  }

  export class Edit {
    static readonly type = TodoActionsTypes.UPDATE_ONE;
    constructor(public payload: ITodoListItem) {}
  }

  export class Remove {
    static readonly type = TodoActionsTypes.REMOVE_ONE;
    constructor(public payload: {id: number}) {}
  }
}

export namespace TodoPanelActions {
  export class ChangePanelVisibility {
    static readonly type = TodoActionsTypes.CHANGE_PANEL_VISIBILITY;
  }
}
