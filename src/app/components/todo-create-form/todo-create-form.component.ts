import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoStatusEnum } from 'src/app/core/models/todo-status.enum';

@Component({
  selector: 'cmp-todo-create-form',
  templateUrl: './todo-create-form.component.html',
  styleUrls: ['./todo-create-form.component.scss']
})
export class TodoCreateFormComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      createdAt: [{ value: new Date(), disabled: true }],
      deadline: ['', Validators.required],
      status: [{ value: TodoStatusEnum, disabled: true }]
    });
  }

  ngOnInit(): void {
    console.log()
  }

  public onSubmit(): void {

  }
}
