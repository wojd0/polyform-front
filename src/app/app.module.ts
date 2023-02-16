import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatorEffects } from './creator/store/creator.effects';
import { creatorReducer } from './creator/store/creator.reducer';
import { ResultsEffects } from './results/store/results.effects';
import { resultsReducer } from './results/store/results.reducer';
import { ChangesGuard } from './shared/changes.guard';
import { SharedModule } from './shared/shared.module';
import { FormEffects } from './submission/store/form.effects';
import { formReducer } from './submission/store/form.reducer';
import { HeaderComponent } from './welcome/header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    AboutComponent,
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
  providers: [ChangesGuard, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {}
