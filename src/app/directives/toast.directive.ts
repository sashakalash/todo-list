import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { INotificationData } from '../core/interfaces/notification-data.interface';
@Directive({
  selector: '[appToast]'
})
export class ToastDirective implements OnInit {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {}

  @Input('appToast') data: INotificationData;

  ngOnInit(): void {
    this.viewContainer.createEmbeddedView(this.templateRef, this.data);
  }

}
