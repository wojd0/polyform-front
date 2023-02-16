import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormCreatorComponent } from './form-creator.component';
import { DateCreatorComponent } from './formats/creator-date/creator-date.component';
import { MultipleCreatorComponent } from './formats/creator-multiple/creator-multiple.component';
import { ListSizeValidatorDirective } from './formats/creator-multiple/list-size-validator.directive';
import { NumberCreatorComponent } from './formats/creator-number/creator-number.component';
import { TextCreatorComponent } from './formats/creator-text/creator-text.component';



@NgModule({
  declarations: [
    FormCreatorComponent,
    DateCreatorComponent,
    NumberCreatorComponent,
    TextCreatorComponent,
    MultipleCreatorComponent,
    ListSizeValidatorDirective,
  ],
  imports: [
    FormsModule,
    SharedModule,
    DragDropModule,
    MatTooltipModule,
    RouterModule.forChild([{path: '', component: FormCreatorComponent}])
  ],
  exports: [
    FormCreatorComponent
  ]
})
export class FormCreatorModule { }
