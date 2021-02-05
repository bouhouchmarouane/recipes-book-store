import * as shoppingListReducer from '../shopping-list/store/shopping-list.reducer';
import * as authReducer from '../auth/store/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';


export interface AppState {
  shoppingList: shoppingListReducer.State;
  auth: authReducer.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer.shoppingListReducer,
  auth: authReducer.authReducer
};
