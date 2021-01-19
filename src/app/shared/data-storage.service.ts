import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {Observable} from 'rxjs';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  url = 'https://ng-recipe-book-d2828-default-rtdb.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes(): Observable<[Recipe]> {
    const recipes = this.recipeService.recipes;
    return this.http.put<[Recipe]>(this.url, recipes);
  }

  getRecipes(): Observable<Recipe[]> {
      return this.http.get<Recipe[]>(this.url).pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }), tap(response => {
        this.recipeService.setRecipes(response);
      }));
  }
}
