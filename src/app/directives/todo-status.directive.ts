import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { TodoStatusEnum } from '../core/models/todo-status.enum';

export const statusToBackgroundColorMap: Map<TodoStatusEnum, string> = new Map([
  [TodoStatusEnum.COMPLETED, 'burlywood'],
  [TodoStatusEnum.CREATED, 'darkgray'],
  [TodoStatusEnum.DELAYED, 'darkgoldenrod'],
  [TodoStatusEnum.FAILED, 'brown'],
  [TodoStatusEnum.IN_PROGRESS, 'darkcyan'],
]);

@Directive({
  selector: '[appTodoStatus]'
})
export class TodoStatusDirective implements OnInit {

  @Input('appTodoStatus') status: TodoStatusEnum;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.style.background = statusToBackgroundColorMap.get(this.status);
  }

}
