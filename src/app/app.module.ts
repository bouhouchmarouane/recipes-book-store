import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core.module';
import {SharedModule} from './shared/shared.module';
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
    SharedModule,
    CoreModule,
    [RouterModule.forRoot([
      {path: '', redirectTo: '/recipes', pathMatch: 'full'},
      {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(module => module.RecipesModule)},
      {path: 'shoppinglist', loadChildren: () => import('./shopping-list/shoping-list.module').then(module => module.ShopingListModule)},
      {path: 'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)}
    ])]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
