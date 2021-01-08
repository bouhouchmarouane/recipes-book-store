import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeResolverService} from './recipes/recipe-detail/recipe-resolver.service';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {CanDeactivateRecipeGuardService} from './recipes/can-deactivate-recipe-guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: [
      {path: '', component: RecipeStartComponent, pathMatch: 'full'},
      {path: 'new', component: RecipeEditComponent, canDeactivate: [CanDeactivateRecipeGuardService]},
      {path: ':id', component: RecipeDetailComponent, resolve: {recipe: RecipeResolverService}},
      {path: ':id/edit', component: RecipeEditComponent,
        resolve: {recipe: RecipeResolverService}, canDeactivate: [CanDeactivateRecipeGuardService]}
    ]},
  {path: 'shoppinglist', component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
