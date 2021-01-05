import { Injectable } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

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

  constructor() { }

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
      this.ingredients[index] = ingredient;
    } else {
      ingredient.id = this.nextId;
      this._ingredients.push(ingredient);
    }
  }

  get nextId(): number {
    // @ts-ignore
    let maxId = Math.max.apply(Math, this.ingredients.map((ing: Ingredient) => {
      return ing.id;
    }));
    return ++maxId;
  }

  deleteIngredient(idIng: number): void {
    const index = this.ingredients.indexOf(this.findIngredientById(idIng));
    this.ingredients.splice(index, 1);
  }
}
