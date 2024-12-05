import { NumberInput } from '@angular/cdk/coercion';
import { Directive, ElementRef, EventEmitter, HostListener, OnInit, Output, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
    selector: '[appMakeInt]',
    standalone: false
})
export class MakeIntDirective implements OnInit {

  constructor(private elRef: ElementRef<HTMLInputElement>, private renderer: Renderer2) {
    
  }

  @HostListener('change') makeInt(){
    const value = Number(this.elRef.nativeElement.value);
    const result = String(Math.floor(value));
    this.renderer.setProperty(this.elRef.nativeElement, 'value' , result);
    this.elRef.nativeElement.dispatchEvent(new InputEvent('input'));
  }

  ngOnInit(): void {

  }

}
