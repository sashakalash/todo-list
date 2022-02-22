import { combineLatest, defer, fromEvent, iif, Observable, of, pluck, startWith, Subject, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
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
export class TodoListComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store,
  ) {}

  @HostBinding('@todos')
  public animatePage = true;

  @ViewChild('filter') set filterRef(ref: ElementRef) {
    if (ref) {
      this._filterRef = ref;
      this.setFilterSubscription();
    }
  }

  public todosTotal = -1;
  public userName$: Observable<string>;
  private destroyed$ = new Subject<void>();
  public todos$: Observable<ITodoListItem[]>;
  private _filterRef: ElementRef;
  private filter$: Observable<any>;
  public filteredTodos$: Observable<ITodoListItem[]>;

  private setFilterSubscription(): void {
    if (this._filterRef) {
      this.filter$ = fromEvent(this._filterRef.nativeElement as HTMLElement, 'input').pipe(
        takeUntil(this.destroyed$),
        pluck('target', 'value'),
        startWith('')
      );

      this.filteredTodos$ = combineLatest([
        this.todos$,
        this.filter$
      ])
        .pipe(
          switchMap(([todos, filter]: [ITodoListItem[], string]) => iif(
            () => !!filter,
            defer(() => of(todos.filter(todo => todo.title.toLowerCase().includes(filter.toLowerCase())))),
            defer(() => of(todos))
          ))
        );
    }
  }

  ngOnInit(): void {
    this.userName$ = this.store.select(fromRoot.TodoState.CommonTodoStateSelectors.selectCurrentUser)
      .pipe(takeUntil(this.destroyed$));

    this.todos$ = this.store.select(fromRoot.TodoState.CommonTodoStateSelectors.selectTodos)
      .pipe(takeUntil(this.destroyed$));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
