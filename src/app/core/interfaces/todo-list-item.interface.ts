import { TodoStatusEnum } from '../models/todo-status.enum';

export interface ITodoListItem {
  id: number,
  title: string,
  createdAt: Date,
  deadline: Date,
  status: TodoStatusEnum
}
