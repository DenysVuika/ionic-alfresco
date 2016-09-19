import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: 'code[highlight]'
})
export class HightlightDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    try {
      let hljs: any = window['hljs'];
      if (hljs) {
        hljs.highlightBlock(this.elementRef.nativeElement);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
