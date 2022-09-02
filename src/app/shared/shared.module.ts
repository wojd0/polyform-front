import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForceMinMaxDirective } from './directives/forceMinMax.directive';
import { GreaterValidatorDirective } from './directives/greater.directive';
import { MakeIntDirective } from './directives/make-int.directive';
import { ModalComponent } from './modal/modal.component';
import { CheckboxValidator } from './directives/checkbox.directive';
import { OpacityDirective } from './directives/opacity.directive';
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
