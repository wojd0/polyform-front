import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckboxValidator } from './directives/checkbox.directive';
import { ForceMinMaxDirective } from './directives/forceMinMax.directive';
import { GreaterValidatorDirective } from './directives/greater.directive';
import { MakeIntDirective } from './directives/make-int.directive';
import { OpacityDirective } from './directives/opacity.directive';
import { ModalComponent } from './modal/modal.component';
import { TrimNullsPipe } from './trim-nulls.pipe';

const elements = [
  ForceMinMaxDirective,
  GreaterValidatorDirective,
  CheckboxValidator,
  MakeIntDirective,
  ModalComponent,
  OpacityDirective,
  TrimNullsPipe
]

@NgModule({
  declarations: elements,
  imports: [
    CommonModule
  ],
  exports: [...elements, CommonModule]

})
export class SharedModule { }
