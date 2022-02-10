import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { INotificationData } from 'src/app/core/models/notification-data.interface';

const DEFAULT_NOTIFICATION_DATA: INotificationData = {
  delay: 3000,
  text: 'Unknown notification'
};
@Component({
  selector: 'cmp-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({
        transform: 'translateY(-50%)',
        opacity: '1'
      })),
      transition('void => *', [
        style({
          transform: 'translateY(0)',
          opacity: '0'
        }),
        animate(300)
      ])
    ])
  ]
})
export class ToastComponent {

  @Input() data: INotificationData = DEFAULT_NOTIFICATION_DATA;

  constructor() { }
}
