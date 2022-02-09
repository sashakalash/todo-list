import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appToast]'
})
export class ToastDirective {

  constructor(
    private elementRef: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {
    // this.elementRef.nativeElement.style.position = 'absolute';

  }

  @Input() set appToast(condition: boolean) {
    if (condition) {
      // setTimeout(() => this.viewContainer.createEmbeddedView(this.templateRef), 1000);
      // setTimeout(() => this.viewContainer.clear(), 3000);
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
