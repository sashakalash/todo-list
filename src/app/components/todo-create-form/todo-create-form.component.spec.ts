import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCreateFormComponent } from './todo-create-form.component';

describe('TodoCreateFormComponent', () => {
  let component: TodoCreateFormComponent;
  let fixture: ComponentFixture<TodoCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoCreateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
