import * as shoppingListReducer from '../shopping-list/store/shopping-list.reducer';
import * as authReducer from '../auth/store/auth.reducer';
import * as recipesReducer from '../recipes/store/recipe.reducer';
import {ActionReducerMap} from '@ngrx/store';


export interface AppState {
  shoppingList: shoppingListReducer.State;
  auth: authReducer.State;
  recipes: recipesReducer.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer.shoppingListReducer,
  auth: authReducer.authReducer,
  recipes: recipesReducer.recipeReducer
};
