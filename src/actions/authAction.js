import * as actionTypes from './actionTypes';

export const login = (user) => {
    return {
      type: actionTypes.LOGIN,
      token: user.token,
      name: user.name,
    }
  };
  
export const logout = () => {
    return {
      type: actionTypes.LOGOUT
    }
  };