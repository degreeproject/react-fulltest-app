const mongodb = require('mongodb');
const config = require('../config');

class RecipeService {
   /**
   * Loads the user collection from MongoDB
   */
  static async loadUserCollection() {
    const client = await mongodb.MongoClient.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return client.db('kex-test-app').collection('users');
  }
  static async getUsers() {
    try {
      const usersCollection = await this.loadUserCollection();
      const users = await usersCollection.find().toArray()
      if (users.length === 0 || !users)
        console.log("No users found in getUsers")
      return users;
    } catch (err) {
      console.log(err)
    }
  }


}

module.exports = RecipeService;