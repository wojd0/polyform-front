import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormComponent } from './form/form.component';
import { FormCreatorComponent } from './creator/form-creator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextCreatorComponent } from './creator/formats/creator-text/creator-text.component';
import { DateCreatorComponent } from './creator/formats/creator-date/creator-date.component';
import { NumberCreatorComponent } from './creator/formats/creator-number/creator-number.component';
import { MultipleCreatorComponent } from './creator/formats/creator-multiple/creator-multiple.component';
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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { creatorReducer } from './creator/store/creator.reducer';
import { CreatorEffects } from './creator/store/creator.effects';
import { ChangesGuard } from './shared/changes.guard';
import { AppState } from './store/app.reducer';
import { formReducer } from './form/store/form.reducer';
import { FormEffects } from './form/store/form.effects';

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
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({creator: creatorReducer, form: formReducer}),
    EffectsModule.forRoot([CreatorEffects, FormEffects])
  ],
  providers: [ChangesGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
