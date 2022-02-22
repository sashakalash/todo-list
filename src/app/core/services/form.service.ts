import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoStatusEnum } from '../models/todo-status.enum';
@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private fb: FormBuilder) {}

  public createForm(): FormGroup {
    const id = Math.random();
    return this.fb.group({
      id,
      title: ['', Validators.required],
      createdAt: [{ value: new Date(), disabled: true }],
      deadline: ['', Validators.required],
      status: [{ value: TodoStatusEnum.CREATED, disabled: true }]
    });
  }

}
