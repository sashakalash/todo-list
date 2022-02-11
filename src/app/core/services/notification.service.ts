import { INotificationData } from 'src/app/core/models/notification-data.interface';
import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { ToastComponent } from 'src/app/components/toast/toast.component';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private factoryResolver: ComponentFactoryResolver) {}

  private rootViewContainer: ViewContainerRef;
  private data: INotificationData;

  private addDynamicComponent(): void {
    const factory = this.factoryResolver.resolveComponentFactory(ToastComponent);
    const component = factory.create(this.rootViewContainer.injector);
    component.instance.data = this.data;

    this.rootViewContainer.insert(component.hostView);
  }

  public showNotification(rootViewContainer: ViewContainerRef, data: INotificationData): void {
    this.rootViewContainer = rootViewContainer;
    this.data = data;
    this.addDynamicComponent();
  }
}
