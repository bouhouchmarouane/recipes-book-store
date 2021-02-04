import { Injectable } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {AddIngredient, DeleteIngredients, UpdateIngredients} from './store/shopping-list.actions';
import {AppState} from './store/shopping-list.reducer';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  editingIngredientSub = new Subject<number | null>();

  constructor(private store: Store<AppState>) { }

  addEditIngredient(ingredient: Ingredient): void {
    if (ingredient.id !== null) {
      this.store.dispatch(new UpdateIngredients(ingredient));
    } else {
      this.store.dispatch(new AddIngredient(ingredient));
    }
  }

  deleteIngredient(): void {
    this.store.dispatch(new DeleteIngredients());
  }
}
