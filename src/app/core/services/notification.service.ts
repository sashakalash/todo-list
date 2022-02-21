import { ComponentType } from '@angular/cdk/portal';
import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

import { INotificationData } from 'src/app/core/models/notification-data.interface';
import { ToastComponent } from 'src/app/components/toast/toast.component';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private factoryResolver: ComponentFactoryResolver) {}

  private data: INotificationData;
  public host: ViewContainerRef;

  private addDynamicComponent(component: ComponentType<ToastComponent>): void {
    const factory = this.factoryResolver.resolveComponentFactory(component);
    const notification = factory.create(this.host.injector);
    notification.instance.data = this.data;
    this.host.insert(notification.hostView);
    this.host.element.nativeElement.parentElement.classList.toggle('host');
  }

  public showNotification(component: ComponentType<ToastComponent>, data: INotificationData): void {
    this.data = data;
    this.addDynamicComponent(component);
    setTimeout(() => this.hideNotification(), this.data.delay);
  }

  public hideNotification(): void {
    this.host.element.nativeElement.parentElement.classList.toggle('host');
    this.host.clear();
  }

}
