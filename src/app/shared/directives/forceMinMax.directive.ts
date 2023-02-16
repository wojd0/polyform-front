import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appForceMinMax]',
})
export class ForceMinMaxDirective implements OnInit {
  @Input('appForceMinMax') borders: {min?: number, max?: number} = {min: 0, max: 0};
  value = 1;
  constructor(private elRef: ElementRef<HTMLInputElement>, private renderer: Renderer2) {
  }

  @HostListener('change') makeInt(){
    this.value = Number(this.elRef.nativeElement.value);
    const min = this.borders.min;
    const max = this.borders.max;
    if(typeof min == 'number'){
      if(this.value < min){
        this.renderer.setProperty(this.elRef.nativeElement, 'value', String(min));
        this.elRef.nativeElement.dispatchEvent(new InputEvent('input'));
        return;
      }
    }
    
    
    if(typeof max == 'number'){
      if(this.value > max){
        this.renderer.setProperty(this.elRef.nativeElement, 'value', String(max));
        this.elRef.nativeElement.dispatchEvent(new InputEvent('input'));
        return;
      }
    }
    
  }

  ngOnInit(): void {
  }

}
