import {Ingredient} from '../../shared/ingredient.model';

const initialState = {
  ingredients: [
    new Ingredient(0, 'Apple', 5),
    new Ingredient(1, 'Tomato', 4),
    new Ingredient(2, 'Cheese', 1),
  ]
}


export function shoppingListReducer(state = initialState, action: any): void {

}
