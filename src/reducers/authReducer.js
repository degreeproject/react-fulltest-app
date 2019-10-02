import * as actionTypes from '../actions/actionTypes';

export default (state = [], action) => {
    switch (action.type){
      case actionTypes.LOGIN:
      return [
        ...state,
        Object.assign({}, action),

      ];
      case actionTypes.LOGOUT:
        return [
          ...state
        ].filter(function(el) { return el.type !== "LOGIN";}); 
    default:
      return state;
    }
  };