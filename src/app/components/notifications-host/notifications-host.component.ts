import { AfterViewInit, Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'cmp-notifications-host',
  template: '<ng-template #notifContainer></ng-template>'
})
export class NotificationsHostComponent implements AfterViewInit {

  @ViewChild('notifContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild('notifContainer', { read: ElementRef }) containerRef: ElementRef;

  constructor(private notificationService: NotificationService) {}

  ngAfterViewInit(): void {
    this.notificationService.host = this.container;
    fromEvent(this.containerRef.nativeElement.parentElement as HTMLElement, 'click')
      .subscribe(() => this.notificationService.hideNotification());

  }
}
