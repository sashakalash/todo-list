import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'cmp-notifications-host',
  template: '<ng-template #notifContainer></ng-template>'
})
export class NotificationsHostComponent implements AfterViewInit {

  @ViewChild('notifContainer', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private notificationService: NotificationService) {}

  ngAfterViewInit(): void {
    this.notificationService.host = this.container;
  }
}
