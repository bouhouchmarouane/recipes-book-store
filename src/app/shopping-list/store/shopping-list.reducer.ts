import {Ingredient} from '../../shared/ingredient.model';
import {ADD_INGREDIENT} from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient(0, 'Apple', 5),
    new Ingredient(1, 'Tomato', 4),
    new Ingredient(2, 'Cheese', 1),
  ]
}


export function shoppingListReducer(state = initialState, action: any): { ingredients: Ingredient[] } {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state, ingredients: [...state.ingredients, action.payload]
      };
    default:
      return state;
  }
}
