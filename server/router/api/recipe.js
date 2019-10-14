/* eslint-disable no-console */
const express = require('express');
const recipeService = require('../../integration/recipe-services');
const router = express.Router();

/**
 * GET: all recipes
 */
router.get('/', async (req, res) => {
  try {
    const recipes = await recipeService.getRecipes()
    return res.status(200).json(recipes);
  } catch (err) {
      return res.sendStatus(500);
    }
  });

/**
 * GET: a specific recipe based on the id
 */
router.get('/:id', async (req, res) => {
  let id = req.params.id
  try {
    const recipe = await recipeService.getRecipe(id)
    return res.status(200).json(recipe);
  } catch (err) {
      return res.sendStatus(500);
    }
  });

/**
 * POST: Adds a new recipe to the database and returns success message on success.
 */
router.post('/', async (req, res) =>{
  try{
    await recipeService.submitRecipe(req.body)
    return res.status(201).json({
      message: 'Recipe successfully created!'
    });
  }catch(err){
    console.log(err)
  }
})

/**
 * POST: Adds a new comment to the recipe with the corresponding id found in the request body.
 */
router.post('/comment', async (req, res) =>{
  try{
    await recipeService.submitComment(req.body)
    return res.status(201).json({
      message: 'Comment successfully created!'
    });
  }catch(err){
    console.log(err)
  }
})


module.exports = router;