import { Observable, of } from 'rxjs';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, OnInit } from '@angular/core';
import { ITodoListItem } from 'src/app/core/models/todo-list-item.interface';
import { Store } from '@ngxs/store';

import * as fromRoot from 'src/app/store';

@Component({
  selector: 'cmp-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('todos', [
      transition(':enter', [
        query('.item', [
          style({ opacity: 0, transform: 'translateY(-100px)' }),
          stagger(30, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: 0 }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: 0 })),
          ]),
        ])
      ]),
    ]),
  ]
})
export class TodoListComponent implements OnInit {

  constructor(
    private store: Store,
  ) {}

  @HostBinding('@todos')
  public animatePage = true;

  public todosTotal = -1;
  public userName$: Observable<string> | undefined;

  get todos$(): Observable<ITodoListItem[]> {
    return this._todos$;
  }

  private _todos$: Observable<ITodoListItem[]> = of([]);

  ngOnInit(): void {
    this._todos$ = this.store.select(fromRoot.TodoState.TodoStateSelectors.selectAllTodos);
    this.userName$ = this.store.select(fromRoot.AuthState.AuthStateSelectors.selectUserName);
  }

  updateCriteria(criteria: string): void {
    criteria = criteria ? criteria.trim() : '';

    // this._todos = HEROES.filter(todo => todo.title.toLowerCase().includes(criteria.toLowerCase()));
    // // const newTotal = this.todos.length;

    // if (this.todosTotal !== newTotal) {
    //   this.todosTotal = newTotal;
    // } else if (!criteria) {
    //   this.todosTotal = -1;
    // }
  }
}
