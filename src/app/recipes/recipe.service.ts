import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesArr: Recipe[] = [];
  recipesSub = new Subject<Recipe[]>();

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

  setRecipes(recipes: Recipe[]): void {
    this.recipesArr = recipes;
    this.recipesSub.next(this.recipesArr);
  }

  constructor() { }
}
