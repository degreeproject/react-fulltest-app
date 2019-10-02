import * as actionTypes from './actionTypes';

export const login = (user) => {
    return {
      type: actionTypes.LOGIN,
      token: user.token,
      name: user.name,
      loggedIn: user.loggedIn
    }
  };
  
export const logout = () => {
    return {
      type: actionTypes.LOGOUT
    }
  };