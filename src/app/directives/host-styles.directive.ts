import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHost]'
})
export class HostStylesDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.setAttribute('class', 'host');
  }

}
