import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { creatorReducer } from './creator/store/creator.reducer';
import { CreatorEffects } from './creator/store/creator.effects';
import { ChangesGuard } from './shared/changes.guard';
import { formReducer } from './form-list/store/form.reducer';
import { FormEffects } from './form-list/store/form.effects';
import { SharedModule } from './shared/shared.module';
import { resultsReducer } from './results/store/results.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ResultsEffects } from './results/store/results.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({creator: creatorReducer, form: formReducer, results: resultsReducer}),
    EffectsModule.forRoot([CreatorEffects, FormEffects, ResultsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    
  ],
  providers: [ChangesGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
