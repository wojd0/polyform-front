import { Directive, Input } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

interface listSizeValidatorParams{minSize: number, maxSize: number, list: Array<any>}

export function listSizeValidator(params: listSizeValidatorParams){
  return (control: AbstractControl) => {
  if(params.list.length < params.minSize) return {'listsmall': true};
  if(params.list.length > params.minSize) return {'listbig': true};

  return null;
  }
}

@Directive({
  selector: '[appListSizeValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ListSizeValidatorDirective,
      multi: true
    }
  ]
})
export class ListSizeValidatorDirective implements Validator {
  @Input('appListSizeValidator') params: listSizeValidatorParams

  validate(control: AbstractControl){
    const params = this.params
    return(listSizeValidator(params)(control))
  }
}
