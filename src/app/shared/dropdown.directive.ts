import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit{
  status = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.status = false;
  }

  @HostListener('click') mouseclick(eventData: Event) {
    this.status = ! this.status;
    const currentElement = this.elementRef.nativeElement;
    const nextElement = this.renderer.nextSibling(currentElement);
    if (this.status){
      this.renderer.addClass(nextElement, 'show');
    } else{
      this.renderer.removeClass(nextElement, 'show');
    }
  }

}
