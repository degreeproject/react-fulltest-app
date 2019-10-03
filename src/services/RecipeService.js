import axios from './RequestObject'

const RECIPE = '/api/recipe'

class RecipeService {
    static getRecipes(){
        return axios.get(RECIPE).then(function(response) {
            return {
                ...response,
            }
        })
    }
}
export default RecipeService;