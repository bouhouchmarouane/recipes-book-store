import {Ingredient} from '../../shared/ingredient.model';
import {ADD_INGREDIENT, ADD_INGREDIENTS} from './shopping-list.actions';

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
      const ingredient = Object.assign({}, action.payload, {id: nextId(state)});
      console.log(ingredient);
      return {
        ...state, ingredients: [...state.ingredients, ingredient]
      };
    case ADD_INGREDIENTS:
      return {
        ...state, ingredients: [...state.ingredients, ...action.payload]
      }
    default:
      return state;
  }
}

function nextId(state: any): number {
  // @ts-ignore
  let maxId = Math.max.apply(Math, state.ingredients.map((ing: Ingredient) => {
    return ing.id;
  }));
  return ++maxId;
}
