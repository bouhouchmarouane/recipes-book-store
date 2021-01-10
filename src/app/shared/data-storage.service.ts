import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  url = 'https://ng-recipe-book-d2828-default-rtdb.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes(): Observable<[Recipe]> {
    const recipes = this.recipeService.recipes;
    return this.http.put<[Recipe]>(this.url, recipes);
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.url)
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }));
  }
}
