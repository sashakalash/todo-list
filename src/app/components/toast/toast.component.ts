import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

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

  constructor() { }
}
