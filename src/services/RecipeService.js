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
    static getRecipe(id){
        return axios.get(RECIPE + "/" + id).then(function(response) {
            return {
                ...response,
            }
        })
    }
    static submitRecipe(recipe){
        console.log(recipe)
        return axios.post(RECIPE, recipe)
    }
}
export default RecipeService;