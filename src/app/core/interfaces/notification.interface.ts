
import { EventEmitter } from '@angular/core';
import { INotificationData } from './notification-data.interface';

export interface INotification {
  data: INotificationData;
  closeEmitter?: EventEmitter<boolean>;
}

