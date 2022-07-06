import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

@Directive({
  selector: '[appIsGreater]',
  providers: [{provide: NG_VALIDATORS, useExisting: GreaterValidatorDirective, multi: true}]
})
export class GreaterValidatorDirective implements Validator {
  @Input('than') than = 0;
  validate (control: AbstractControl): ValidationErrors | null {
    const invalid = control.value > this.than;
    return invalid ? {isGreater: {value: control.value}} : null;
  }
}