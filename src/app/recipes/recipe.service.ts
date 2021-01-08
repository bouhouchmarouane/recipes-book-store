import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesArr: Recipe[] = [
    new Recipe(0, 'Test1',
      'This is simply a test1',
      'https://static01.nyt.com/images/2020/01/24/dining/yk-gochujang-chicken-and-vegetables/merlin_167664060_7435c624-7225-4cb1-b104-4d67761185a4-articleLarge.jpg',
      [
        new Ingredient(3, 'Potatoes', 5),
        new Ingredient(4, 'Tomato', 4),
        new Ingredient(5, 'Water', 1),
        new Ingredient(6, 'Cheese', 1)]),
    new Recipe(1, 'Test2',
      'This is simply a test2',
      'https://cookieandkate.com/images/2020/03/vegan-chana-masala-recipe-2-550x824.jpg',
      [
        new Ingredient(7, 'Apple', 5),
        new Ingredient(8, 'Cheese', 1)]),
    new Recipe(2, 'Test3',
      'This is simply a test3',
      'https://www.cookwithmanali.com/wp-content/uploads/2014/08/Poha-Recipe.jpg',
      [
        new Ingredient(9, 'Lemon', 5),
        new Ingredient(10, 'Pasta', 1),
        new Ingredient(11, 'Cheese', 1)])
  ];

  get recipes(): Recipe[] {
    return this.recipesArr;
  }

  getRecipe(id: number): Recipe {
    return this.recipes.find((recipe: Recipe) => {
      return recipe.id === id;
    }) as Recipe;
  }

  addEditRecipe(recipe: Recipe): number {
    let id = null;
    if (recipe.id !== null) {
      const index = this.recipes.indexOf(this.getRecipe(recipe.id));
      if (index < 0) {
        id = this.addRecipe(recipe);
      } else {
        console.log(recipe);
        this.editRecipe(recipe, index);
        id = recipe.id;
      }
    } else {
      id = this.addRecipe(recipe);
    }
    return id;
  }

  get nextId(): number {
    // @ts-ignore
    let maxId = Math.max.apply(Math, this.recipes.map((recipe: Recipe) => {
      return recipe.id;
    }));
    return ++maxId;
  }

  addRecipe(recipe: Recipe): number {
    recipe.id = this.nextId;
    this.recipes.push(recipe);
    return recipe.id;
  }

  editRecipe(recipe: Recipe, index: number): void {
    this.recipes[index] = recipe;
  }

  deleteRecipe(id: number): boolean {
    if (confirm('Are you sure to delete this recipe ?')) {
      const index = this.recipes.indexOf(this.getRecipe(id));
      this.recipes.splice(index, 1);
      return true;
    }
    return false;
  }

  constructor() { }
}
