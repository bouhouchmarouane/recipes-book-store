import { Injectable } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {AddIngredient, DeleteIngredients, UpdateIngredients} from './store/shopping-list.actions';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  // tslint:disable-next-line:variable-name
  private _ingredients: Ingredient[] = [
    new Ingredient(0, 'Apple', 5),
    new Ingredient(1, 'Tomato', 4),
    new Ingredient(2, 'Cheese', 1),
  ];

  editingIngredientSub = new Subject<number | null>();

  constructor(private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  get ingredients(): Ingredient[] {
    return this._ingredients;
  }

  findIngredientById(idIng: number): Ingredient {
    return this.ingredients.find(ing => {
      return ing.id === idIng;
    }) as Ingredient;
  }

  addEditIngredient(ingredient: Ingredient): void {
    if (ingredient.id !== null) {
      const index = this.ingredients.indexOf(this.findIngredientById(ingredient.id));
      if (index < 0) {
        // this.addIngredient(ingredient);
        this.store.dispatch(new AddIngredient(ingredient));
      }
      else{
        // this.editIngredient(ingredient, index);
        this.store.dispatch(new UpdateIngredients({ingredient, index}));
      }
    } else {
      // this.addIngredient(ingredient);
      this.store.dispatch(new AddIngredient(ingredient));
    }
  }

  private editIngredient(ingredient: Ingredient, index: number): void {
    this.ingredients[index] = ingredient;
  }

  private addIngredient(ingredient: Ingredient): void {
    ingredient.id = this.nextId;
    this._ingredients.push(ingredient);
  }

  get nextId(): number {
    // @ts-ignore
    let maxId = Math.max.apply(Math, this.ingredients.map((ing: Ingredient) => {
      return ing.id;
    }));
    return ++maxId;
  }

  deleteIngredient(idIng: number): void {
    // const index = this.ingredients.indexOf(this.findIngredientById(idIng));
    // this.ingredients.splice(index, 1);
    this.store.dispatch(new DeleteIngredients(idIng));
  }
}
