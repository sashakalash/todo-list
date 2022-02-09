import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'cmp-slide-panel',
  templateUrl: './slide-panel.component.html',
  styleUrls: ['./slide-panel.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void <=> *', [
        style({ transform: 'translateX(-100%)' }),
        animate('.5s ease-out')
      ])
    ])
  ]
})
export class SlidePanelComponent {


  constructor() {}
}
