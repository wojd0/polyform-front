import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormComponent } from './form.component';
import { FormListComponent } from './form-list/form-list.component';
import { TextAnswerComponent } from './form-list/formats/text/text.component';
import { NumberAnswerComponent } from './form-list/formats/number/number.component';
import { MultipleAnswerComponent } from './form-list/formats/multiple/multiple.component';
import { FileAnswerComponent } from './form-list/formats/file/file.component';
import { DateAnswerComponent } from './form-list/formats/date/date.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RadioComponent } from './form-list/formats/radio/radio.component';



@NgModule({
  declarations: [
    FormComponent,
    FormListComponent,
    TextAnswerComponent,
    NumberAnswerComponent,
    MultipleAnswerComponent,
    FileAnswerComponent,
    DateAnswerComponent,
    RadioComponent,
  ],
  imports: [
    RouterModule.forChild([{path: '', component: FormListComponent}]),
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    FormComponent
  ]
})
export class FormFillModule { }
