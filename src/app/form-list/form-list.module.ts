import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { FormListComponent } from "./form-list.component";
import { DateAnswerComponent } from "./formats/date/date.component";
import { FileAnswerComponent } from "./formats/file/file.component";
import { MultipleAnswerComponent } from "./formats/multiple/multiple.component";
import { NumberAnswerComponent } from "./formats/number/number.component";
import { RadioAnswerComponent } from "./formats/radio/radio.component";
import { TextAnswerComponent } from "./formats/text/text.component";

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: FormListComponent}])
    ],
    declarations: [
        FormListComponent,
        DateAnswerComponent,
        FileAnswerComponent,
        MultipleAnswerComponent,
        NumberAnswerComponent,
        RadioAnswerComponent,
        TextAnswerComponent
    ],

})
export class FormListModule{}