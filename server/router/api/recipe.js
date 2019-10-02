const express = require('express');
const recipeService = require('../../integration/recipe-services');
const router = express.Router();
const config = require('../../config');

/**
 * GET: a single users basic information
 */
router.get('/', async (req, res) => {
      const recipes = await recipeService.getRecipes();
      return res.json(recipes);
    });

module.exports = router;
