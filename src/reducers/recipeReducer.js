import * as actionTypes from '../actions/actionTypes';

/**
 * Takes the previous state of recipes and adds a new recipe
 * to it if the passed action type matches ADDRECIPES
 */
export default (state = [], action) => {
    switch (action.type){
      case actionTypes.ADDRECIPES:
      return [
        ...state,
        Object.assign({}, action),
      ];
    default:
      return state;
    }
  };