const mongodb = require('mongodb');
const config = require('../config');

const DUPL_USER = 11000;

class UserService {
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
  /**
   * Adds a user to the database
   * @param {*} newUser The new user to be added
   */
  static async submitUser(newUser) {
    try {
      const userCollection = await this.loadUserCollection();
      await userCollection.insertOne(newUser);
    } catch (err) {
      if (err.code === DUPL_USER)
        throw new Error('A user with that username already exists');

      throw new Error('Database error');
    }
  }

  /**
   * Authenticates a user with the username and password passed
   */
  static async authenticateUser(username, password) {
    try {
      const userCollection = await this.loadUserCollection();
      const foundUser = await userCollection.findOne({
        username
      }, {
        projection: {
          _id: 0,
          password: 1
        }
      });
      if (!foundUser) {
        // eslint-disable-next-line no-console
        console.log('Error in authenticateUser, no user found')
        throw new Error('No such user');
      }
      return (password === foundUser.password);
    } catch (err) {
      if (err instanceof Error)
        throw err;
      // eslint-disable-next-line no-console
      console.log('Error in authenticateUser: ', err);
      throw new Error('Database error');
    }
  }
}

module.exports = UserService;