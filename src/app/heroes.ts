import { ITodoListItem } from './core/models/todo-list-item.interface';
import { TodoStatusEnum } from './core/models/todo-status.enum';

export const HEROES: ITodoListItem[] = [
  { id: 11, title: 'Dr Nice', createdAt: new Date(), deadline: new Date(), status: TodoStatusEnum.CREATED },
  { id: 12, title: 'Narco', createdAt: new Date(), deadline: new Date(), status: TodoStatusEnum.CREATED },
  { id: 13, title: 'Bombasto', createdAt: new Date(), deadline: new Date(), status: TodoStatusEnum.CREATED },
  { id: 14, title: 'Celeritas', createdAt: new Date(), deadline: new Date(), status: TodoStatusEnum.CREATED },
  { id: 15, title: 'Magneta', createdAt: new Date(), deadline: new Date(), status: TodoStatusEnum.CREATED },
  { id: 16, title: 'RubberMan', createdAt: new Date(), deadline: new Date(), status: TodoStatusEnum.CREATED },
  { id: 17, title: 'Dynama', createdAt: new Date(), deadline: new Date(), status: TodoStatusEnum.CREATED },
  { id: 18, title: 'Dr IQ', createdAt: new Date(), deadline: new Date(), status: TodoStatusEnum.CREATED },
  { id: 19, title: 'Magma', createdAt: new Date(), deadline: new Date(), status: TodoStatusEnum.CREATED },
  { id: 20, title: 'Tornado', createdAt: new Date(), deadline: new Date(), status: TodoStatusEnum.CREATED }
];

export const USERS: string[] = [
  'Kelly Capwell',
  'C.C. Capwell',
  'Cruz Castillo',
  'Eden Capwell',
  'Peter Flint'
];
