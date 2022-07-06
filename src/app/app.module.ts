import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormComponent } from './form/form.component';
import { FormCreatorComponent } from './form/form-creator/form-creator.component';
import { FormsModule } from '@angular/forms';
import { TextCreatorComponent } from './form/form-creator/formats/creator-text/creator-text.component';
import { DateCreatorComponent } from './form/form-creator/formats/creator-date/creator-date.component';
import { NumberCreatorComponent } from './form/form-creator/formats/creator-number/creator-number.component';
import { MultipleCreatorComponent } from './form/form-creator/formats/creator-multiple/creator-multiple.component';
import { FormListComponent } from './form/form-list/form-list.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FileAnswerComponent } from './form/form-list/formats/file/file.component';
import { TextAnswerComponent } from './form/form-list/formats/text/text.component';
import { DateAnswerComponent } from './form/form-list/formats/date/date.component';
import { NumberAnswerComponent } from './form/form-list/formats/number/number.component';
import { MultipleAnswerComponent } from './form/form-list/formats/multiple/multiple.component';
import { MakeIntDirective } from './shared/directives/make-int.directive';
import { GreaterValidatorDirective } from './shared/directives/greater.directive';
import { ForceMinMaxDirective } from './shared/directives/forceMinMax.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    FormComponent,
    FormCreatorComponent,
    TextCreatorComponent,
    DateCreatorComponent,
    NumberCreatorComponent,
    MultipleCreatorComponent,
    FormListComponent,
    FileAnswerComponent,
    TextAnswerComponent,
    DateAnswerComponent,
    NumberAnswerComponent,
    MultipleAnswerComponent,
    MakeIntDirective,
    GreaterValidatorDirective,
    ForceMinMaxDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    MatTooltipModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
