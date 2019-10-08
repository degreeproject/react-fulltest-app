import axios from './RequestObject'

const RECIPE = '/api/recipe'
const COMMENT = '/api/recipe/comment'

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
        return axios.post(RECIPE, recipe)
    }
    static submitComment(comment){
        return axios.post(COMMENT, comment)
    }
}
export default RecipeService;