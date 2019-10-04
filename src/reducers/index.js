
import { combineReducers } from 'redux';
import authentication from './authReducer';
import recipe from './recipeReducer';

export default combineReducers({
    authentication: authentication,
    recipe: recipe
});