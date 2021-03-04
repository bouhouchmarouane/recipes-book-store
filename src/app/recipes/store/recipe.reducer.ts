import {Action, UPDATE} from '@ngrx/store';
import {Recipe} from '../recipe.model';
import {ADD_RECIPE, DELETE_RECIPE, SET_RECIPES, UPDATE_RECIPE} from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
}

export function recipeReducer(state: State = initialState, action: any): State {
  let recipe: Recipe;
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case ADD_RECIPE:
      recipe = Object.assign({}, action.payload, {id: nextId(state)});
      return {
        ...state,
        recipes: [...state.recipes, recipe]
      };
    case UPDATE_RECIPE:
      const oldRecipe = state.recipes.find(rcp => rcp.id === action.payload.id);
      if (oldRecipe) {
        const index = state.recipes.indexOf(oldRecipe);
        const updatedRecipe = {...state.recipes[index], ...action.payload};
        const updatedRecipes = [...state.recipes];
        updatedRecipes[index] = updatedRecipe;
        return {
          ...state,
          recipes: updatedRecipes
        };
      }
      return state;
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(rcp => rcp.id !== +action.payload)
      };
    default:
      return state;
  }
}

function nextId(state: State): number {
  if (state.recipes.length === 0) {
    return 0;
  }
  let maxId = Math.max.apply(Math, state.recipes.map((recipe: Recipe) => {
    return recipe.id;
  }));
  return ++maxId;
}
