import { Directive, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[appOpacity]',
    standalone: false
})
export class OpacityDirective implements OnChanges {
  @Input('if') show: any;

  constructor(private elRef: ElementRef<HTMLElement>, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'opacity', this.show ? 100 : 0);
  }
}
