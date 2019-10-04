import * as actionTypes from './actionTypes';

export const login = (user) => {
    return {
      type: actionTypes.LOGIN,
      token: user,
      name: user.name,
    }
  };
  
export const logout = () => {
    return {
      type: actionTypes.LOGOUT
    }
  };
  export const addToken = (token) => {
    return {
      type: actionTypes.ADDTOKEN,
      token: token,
      name: token.name,
    }
  };