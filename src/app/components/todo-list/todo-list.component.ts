import { map, Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, OnDestroy } from '@angular/core';
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
        ],
          { optional: true }
        )
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
export class TodoListComponent implements OnDestroy {

  constructor(
    private store: Store,
  ) {
    this.userName$ = this.store.select(fromRoot.TodoState.CommonTodoStateSelectors.selectCurrentUser)
        .pipe(takeUntil(this.destroyed$));
    this._todos$ = this.store.select(fromRoot.TodoState.CommonTodoStateSelectors.selectTodos)
      .pipe(takeUntil(this.destroyed$));
  }

  @HostBinding('@todos')
  public animatePage = true;

  public todosTotal = -1;
  public userName$: Observable<string>;
  private destroyed$ = new Subject<void>();

  get todos$(): Observable<ITodoListItem[]> {
    return this._todos$;
  }

  private _todos$: Observable<ITodoListItem[]> = of([]);

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public updateCriteria(criteria: string): void {
    criteria = criteria ? criteria.trim() : '';

    // this._todos = HEROES.filter(todo => todo.title.toLowerCase().includes(criteria.toLowerCase()));
    // // const newTotal = this.todos.length;

    // if (this.todosTotal !== newTotal) {
    //   this.todosTotal = newTotal;
    // } else if (!criteria) {
    //   this.todosTotal = -1;
    // }
  }

  public remove(id: number): void {
    this.store.dispatch(new fromRoot.TodoState.CommonTodoActions.RemoveTodoItem({ id }));
  }

  public edit(item: ITodoListItem): void {
    this.store.dispatch(new fromRoot.TodoState.CommonTodoActions.SetCurrentTodoItem(item));
    this.store.dispatch(new fromRoot.TodoState.TodoPanelActions.ChangePanelVisibility());
  }
}
