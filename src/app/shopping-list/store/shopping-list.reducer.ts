import {Ingredient} from '../../shared/ingredient.model';
import {ADD_INGREDIENT, ADD_INGREDIENTS, DELETE_INGREDIENTS, START_EDIT, STOP_EDIT, UPDATE_INGREDIENT} from './shopping-list.actions';
import {createSelector} from '@ngrx/store';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null;
  editedIngredientId: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [
    new Ingredient(0, 'Apple', 5),
    new Ingredient(1, 'Tomato', 4),
    new Ingredient(2, 'Cheese', 1),
  ],
  editedIngredient: null,
  editedIngredientId: -1
}

export function shoppingListReducer(state: State = initialState, action: any): State {
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
    case START_EDIT:
      return {
        ...state,
        editedIngredientId: action.payload,
        editedIngredient: findIngredientById(state, action.payload)
      };
    case STOP_EDIT:
      // console.log({
      //   ...state,
      //   editedIngredient: null,
      //   editedIngredientId: -1
      // });
      return {
        ...state,
        editedIngredient: null,
        editedIngredientId: -1
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

function findIngredientById(state: State, idIng: number): Ingredient {
  return state.ingredients.find(ing => {
    return ing.id === idIng;
  }) as Ingredient;
}
