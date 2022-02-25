import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INotificationData } from 'src/app/core/interfaces/notification-data.interface';
import { INotification } from 'src/app/core/interfaces/notification.interface';

const DEFAULT_CONFIRMATION_DATA: INotificationData = {
  delay: 3000,
  text: 'Unknown dialog'
};

@Component({
  selector: 'cmp-confirmation-dialod',
  templateUrl: './confirmation-dialod.component.html',
  styleUrls: ['./confirmation-dialod.component.scss']
})
export class ConfirmationDialodComponent implements INotification {

  constructor() {}

  @Input() data: INotificationData = DEFAULT_CONFIRMATION_DATA;
  @Output() closeEmitter = new EventEmitter<boolean>();

  public confirm(): void {
    this.closeEmitter.emit(true);
  }

  public cancel(): void {
    this.closeEmitter.emit(false);
  }
}
