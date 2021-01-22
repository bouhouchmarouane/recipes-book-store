import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {RecipesModule} from './recipes/recipes.module';
import {ShopingListModule} from './shopping-list/shoping-list.module';
import {CoreModule} from './core.module';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    RecipesModule,
    ShopingListModule,
    SharedModule,
    CoreModule,
    AuthModule,
    [RouterModule.forRoot([
      {path: '', redirectTo: '/recipes', pathMatch: 'full'}
    ])]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
