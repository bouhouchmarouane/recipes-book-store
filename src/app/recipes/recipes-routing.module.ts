import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes.component';
import {AuthGuard} from '../auth/auth.guard';
import {RecipesResolverService} from './recipes-resolver.service';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {CanDeactivateRecipeGuardService} from './can-deactivate-recipe-guard.service';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeResolverService} from './recipe-detail/recipe-resolver.service';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], resolve: {recipes: RecipesResolverService}, children: [
      {path: '', component: RecipeStartComponent, pathMatch: 'full'},
      {path: 'new', component: RecipeEditComponent, canDeactivate: [CanDeactivateRecipeGuardService]},
      {path: ':id', component: RecipeDetailComponent,
        resolve: {recipe: RecipeResolverService}},
      {path: ':id/edit', component: RecipeEditComponent,
        resolve: {recipe: RecipeResolverService},
        canDeactivate: [CanDeactivateRecipeGuardService]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
