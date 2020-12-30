import { Injectable } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private _ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 4),
    new Ingredient('Cheese', 1),
  ];

  constructor() { }

  get ingredients(): Ingredient[] {
    return this._ingredients;
  }

  addIngredient(ingredient: Ingredient): void {
    this._ingredients.push(ingredient);
  }

}
