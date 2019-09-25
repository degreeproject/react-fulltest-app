const express = require('express');
const recipeservice = require('../../integration/recipe-services');
const router = express.Router();

/**
 * GET: a single users basic information
 */
router.get('/', async (req, res) => {
      const recipes = await recipeservice.getRecipes();
      return res.json(recipes);
    });

module.exports = router;