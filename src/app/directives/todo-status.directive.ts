import { Directive, ElementRef, Input } from '@angular/core';
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
export class TodoStatusDirective {

  @Input() set appTodoStatus(status: TodoStatusEnum) {
    this.elementRef.nativeElement.style.background = statusToBackgroundColorMap.get(status);
  }

  constructor(private elementRef: ElementRef) { }

}
