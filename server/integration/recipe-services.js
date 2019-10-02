const mongodb = require('mongodb');
const config = require('../config');

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
      const recipe = await recipeCollection.find().toArray()
      if (recipe.length === 0 || !recipe)
        console.log("No recipes found in getRecipes")
      return recipe;
    } catch (err) {
      console.log(err)
    }
  }


}

module.exports = RecipeService;
