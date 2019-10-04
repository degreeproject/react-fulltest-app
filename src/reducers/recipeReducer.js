import * as actionTypes from '../actions/actionTypes';

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