
import { combineReducers } from 'redux';
import authentication from './authReducer';
import recipe from './recipeReducer';

/**
 * Combines the reducer into one rootreducer
 */
export default combineReducers({
    authentication: authentication,
    recipe: recipe
});