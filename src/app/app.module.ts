import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core.module';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {StoreModule} from '@ngrx/store';
import {appReducer} from './store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
