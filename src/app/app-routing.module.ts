import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(module => module.RecipesModule)},
  {path: 'shoppinglist', loadChildren: () => import('./shopping-list/shoping-list.module').then(module => module.ShopingListModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
