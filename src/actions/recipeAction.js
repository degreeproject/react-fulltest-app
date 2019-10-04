import * as actionTypes from './actionTypes';

export const addRecipes = (recipes) => {
    return {
      type: actionTypes.ADDRECIPES,
      recipes: recipes
    }
  };