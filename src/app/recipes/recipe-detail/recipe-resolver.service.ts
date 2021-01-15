import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from '../recipe.model';
import {Observable} from 'rxjs';
import {RecipeService} from '../recipe.service';
import {DataStorageService} from '../../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe> {

  constructor(private recipeService: RecipeService, private dataStorageService: DataStorageService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    const recipes = this.recipeService.recipes;
    let recipe = this.recipeService.getRecipe(+route.params.id);
    if (recipes.length === 0) {
      this.dataStorageService.getRecipes().subscribe(() => recipe = this.recipeService.getRecipe(+route.params.id));
    }
    return recipe;
  }
}
