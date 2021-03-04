import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {SetRecipes} from '../recipes/store/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  url = 'https://ng-recipe-book-d2828-default-rtdb.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService, private store: Store<AppState>) {}

  storeRecipes(): Observable<[Recipe]> {
    const recipes = this.recipeService.recipes;
    return this.http.put<[Recipe]>(this.url, recipes);
  }

   getRecipes(): Observable<Recipe[] | null> {
      return this.http.get<Recipe[]>(this.url).pipe(map(recipes => {
        if (recipes != null) {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }
        return null;
      }), tap(response => {
        if (response !== null) {
          this.store.dispatch(new SetRecipes(response));
        }
      }));
  }
}
