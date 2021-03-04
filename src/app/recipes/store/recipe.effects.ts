import {Actions, Effect, ofType} from '@ngrx/effects';
import {FETCH_RECIPES, SetRecipes} from './recipe.actions';
import {map, switchMap, tap} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {Injectable} from '@angular/core';

@Injectable()
export class RecipeEffects {
  url = 'https://ng-recipe-book-d2828-default-rtdb.firebaseio.com/recipes.json';

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(this.url);
    }), map(recipes => {
      if (recipes === null) {
        return [];
      }
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }), map(recipes => {
      if (recipes !== null) {
        return new SetRecipes(recipes);
      }
      return [];
    }));

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<AppState>) {}
}
