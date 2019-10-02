const express = require('express');
const recipeService = require('../../integration/recipe-services');
const router = express.Router();
const config = require('../../config');

/**
 * GET: a single users basic information
 */
router.get('/', async (req, res) => {
  try {
    const recipes = await recipeService.getRecipes()
    return res.status(200).json(recipes);
  } catch (err) {
      return res.sendStatus(500);
    }
  });

module.exports = router;
