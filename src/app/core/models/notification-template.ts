import { Component, Input, ViewContainerRef } from '@angular/core';
import { INotificationData } from './notification-data.interface';

const DEFAULT_NOTIFICATION_DATA: INotificationData = {
  delay: 3000,
  text: 'Unknown notification'
};

@Component({
  selector: 'cmp-notification-wrapper',
  template: '<ng-content></ng-content>'
})
export class NotificationTemplateComponent {

  @Input() data: INotificationData = DEFAULT_NOTIFICATION_DATA;
  protected rootViewContainer: ViewContainerRef;

  constructor(public viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

}

