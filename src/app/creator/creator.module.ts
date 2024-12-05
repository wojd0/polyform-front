import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateCreatorComponent } from './formats/creator-date/creator-date.component';
import { NumberCreatorComponent } from './formats/creator-number/creator-number.component';
import { TextCreatorComponent } from './formats/creator-text/creator-text.component';
import { MultipleCreatorComponent } from './formats/creator-multiple/creator-multiple.component';
import { FormsModule } from '@angular/forms';
import { FormCreatorComponent } from './form-creator.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from "@angular/material/tooltip";



@NgModule({
  declarations: [
    FormCreatorComponent,
    DateCreatorComponent,
    NumberCreatorComponent,
    TextCreatorComponent,
    MultipleCreatorComponent,
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
