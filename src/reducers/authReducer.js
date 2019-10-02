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
        ]
      case actionTypes.ADDTOKEN:
        return [
          ...state,
          Object.assign({}, action),
        ]
    default:
      return state;
    }
  };