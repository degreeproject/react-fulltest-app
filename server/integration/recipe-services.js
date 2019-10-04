const mongodb = require('mongodb');
const config = require('../config');

const DUPL_RECIPETITLE = 11000;
class RecipeService {
   /**
   * Loads the recipe collection from MongoDB
   */
  static async loadRecipeCollection() {
    const client = await mongodb.MongoClient.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return client.db('kex-test-app').collection('recipes');
  }
  static async getRecipes() {
    try {
      const recipeCollection = await this.loadRecipeCollection();
      const recipes = await recipeCollection.find().toArray()
      if (recipes.length === 0 || !recipes)
        console.log("No recipes found in getRecipes")
      return recipes;
    } catch (err) {
      console.log(err)
    }
  }
  static async getRecipe(id) {
    try {
      const recipeCollection = await this.loadRecipeCollection();
      const recipe = await recipeCollection.findOne({id: id})
      if (recipe.length === 0 || !recipe)
        console.log("No recipes found in getRecipes")
      return recipe;
    } catch (err) {
      console.log(err)
    }
  }

  static async submitRecipe(recipe) {
    try {
      const recipeCollection = await this.loadRecipeCollection();
      await recipeCollection.insertOne(recipe);
    } catch (err) {
      if (err.code === DUPL_RECIPETITLE)
        throw new Error('A recipe with that title already exists').code(500);

      throw new Error('Database error').code(500);
    }
  }


}

module.exports = RecipeService;
