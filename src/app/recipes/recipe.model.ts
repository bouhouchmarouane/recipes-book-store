import {Ingredient} from '../shared/ingredient.model';

export class Recipe {
  constructor(public id: any, public name: string, public description: string,
              public imagePath: string, public ingredients: Ingredient[]) {}
}
