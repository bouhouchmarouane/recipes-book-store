import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';

export class RecipeService {
  private _recipes: Recipe[] = [
    new Recipe('Test1',
      'This is simply a test1',
      'https://static01.nyt.com/images/2020/01/24/dining/yk-gochujang-chicken-and-vegetables/merlin_167664060_7435c624-7225-4cb1-b104-4d67761185a4-articleLarge.jpg',
      [
        new Ingredient('Potatoes', 5),
        new Ingredient('Tomato', 4),
        new Ingredient('Water', 1),
        new Ingredient('Cheese', 1)]),
    new Recipe('Test2',
      'This is simply a test2',
      'https://cookieandkate.com/images/2020/03/vegan-chana-masala-recipe-2-550x824.jpg',
      [
        new Ingredient('Apple', 5),
        new Ingredient('Cheese', 1)]),
    new Recipe('Test3',
      'This is simply a test3',
      'https://www.cookwithmanali.com/wp-content/uploads/2014/08/Poha-Recipe.jpg',
      [
        new Ingredient('Lemon', 5),
        new Ingredient('Pasta', 1),
        new Ingredient('Cheese', 1)])
  ];

  selectedRecipe = new EventEmitter<Recipe>();

  get recipes(): Recipe[] {
    return this._recipes;
  }

  constructor() { }
}
