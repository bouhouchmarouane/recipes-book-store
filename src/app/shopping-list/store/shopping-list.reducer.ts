import {Ingredient} from '../../shared/ingredient.model';
import {ADD_INGREDIENT, ADD_INGREDIENTS, DELETE_INGREDIENTS, UPDATE_INGREDIENT} from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient(0, 'Apple', 5),
    new Ingredient(1, 'Tomato', 4),
    new Ingredient(2, 'Cheese', 1),
  ]
}

export function shoppingListReducer(state = initialState, action: any): { ingredients: Ingredient[] } {
  let ingredient: Ingredient;
  switch (action.type) {
    case ADD_INGREDIENT:
      ingredient = Object.assign({}, action.payload, {id: nextId(state)});
      return {
        ...state, ingredients: [...state.ingredients, ingredient]
      };
    case ADD_INGREDIENTS:
      return {
        ...state, ingredients: [...state.ingredients, ...action.payload]
      }
    case UPDATE_INGREDIENT:
      ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const updatedIngredients = [...state.ingredients]
      updatedIngredients[action.payload.index] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients
      }
    case DELETE_INGREDIENTS:
      return {
        ...state,
        ingredients: state.ingredients.filter(ing => {
          return ing.id !== action.payload;
        })
      };
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
