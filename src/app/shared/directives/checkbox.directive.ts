import { Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";
import { UntypedFormGroup, ValidationErrors } from "@angular/forms";

@Directive({
  selector: "[appCheckboxValidator]",
})
export class CheckboxValidator {
  @Input('formGroup') formGroup: UntypedFormGroup;
  @Input('requiredAny') required = false;
  @Input('limit') limit = 0;

  constructor(private elRef: ElementRef<HTMLInputElement>, private renderer: Renderer2){}

  @HostListener('change')
  validate() {
      //count true values
      let selectedAmount = 0;
      Object.values(this.formGroup.value).map((value) => {
        if (value) selectedAmount++;
      });
      
      //check if exceeds limits
      if (selectedAmount > this.limit && this.limit !== 1)
       return this.formGroup.setErrors({overLimit: true});
      
      //check if there is a value required
      if(this.required && selectedAmount === 0)
        return this.formGroup.setErrors({isRequired: true});

      return null;
    
  }
}
